import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Stomp } from "@stomp/stompjs";
import axios from "axios"; // axios를 사용하여 HTTP 요청을 보냅니다.

function ChatRoomPage() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const stompClient = useRef(null);
  const { user } = useSelector((state) => state.user);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    connect();
    fetchMessages();
    return () => disconnect();
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const connect = () => {
    const socket = new WebSocket(process.env.REACT_APP_SERVER + "/chat/inbox");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/exchange/chat.exchange/room.${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  const fetchMessages = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (isLoading || !hasMore) return;
  
    setIsLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + `/v1/chatRoom/message`,
        {
          params: { page: page, size: 11, roomId: roomId },
          withCredentials: true,
          headers: {
            Authorization: accessToken,
          },
        }
      );
  
      const newMessages = response.data.latestChatMessages;
      if (newMessages.length === 0) {
        setHasMore(false);
      } else {
        setMessages((prevMessages) => [
          ...newMessages.reverse(),
          ...prevMessages,
        ]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, [roomId, page, isLoading, hasMore]);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container.scrollTop === 0 && !isLoading && hasMore) {
      fetchMessages();
    }
  }, [fetchMessages, isLoading, hasMore]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const sendMessage = () => {
    if (stompClient.current && message) {
      const messageObj = {
        roomId: roomId,
        authorId: user.id,
        message: message,
      };
      stompClient.current.send(`/pub/chat.message`, {}, JSON.stringify(messageObj));
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <div className="bg-indigo-600 p-4 text-white shadow-md">
        <h2 className="text-xl font-semibold">Chat Room: {roomId}</h2>
      </div>
      <div
        ref={messagesContainerRef}
        className="flex-1 space-y-4 overflow-y-auto p-4"
      >
        {isLoading && <div className="text-center">Loading...</div>}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.authorId === user.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                msg.authorId === user.id
                  ? "bg-indigo-500 text-white"
                  : "bg-white"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <span className="mt-1 block text-xs text-gray-500">
                {msg.sender}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="메시지를 입력하세요..."
          />
          <button
            onClick={sendMessage}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomPage;
