import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Stomp } from "@stomp/stompjs";

function ChatRoomPage() {
  const { roomId } = useParams(); // URL에서 채팅방 ID를 가져옴
  const [messages, setMessages] = useState([]); // 채팅 메시지 상태
  const [message, setMessage] = useState(""); // 메시지 입력 상태
  const stompClient = useRef(null); // STOMP 클라이언트를 위한 ref. 웹소켓 연결을 유지하기 위해 사용
  const currentUser = useSelector((state) => state.user); // Redux store에서 현재 사용자 정보 가져오기
  const { user } = useSelector((state) => state.user);

  const messagesEndRef = useRef(null); // 채팅 메시지 목록의 끝을 참조하는 ref. 새 메시지가 추가될 때 스크롤을 이동하기 위해 사용

  useEffect(() => {
    connect(); // 웹소켓 연결
    fetchMessages(); // 초기 메시지 로딩
    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => disconnect();
  }, [roomId]);

  // 메시지 목록이 업데이트될 때마다 스크롤을 최하단으로 이동시키는 함수
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 스크롤을 최하단으로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 웹소켓 연결 설정
  const connect = () => {
    const socket = new WebSocket(process.env.REACT_APP_SERVER + "/chat/inbox");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/sub/channel/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
    console.log("Room ID", roomId);
  };

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  // 기존 채팅 메시지를 서버로부터 가져오는 함수
  const fetchMessages = () => {
    // axios를 사용하여 서버에서 메시지를 가져오는 로직이었으나, 코드에서 제외되었습니다.
    // 필요에 따라 다른 방법으로 메시지를 가져오는 로직을 추가하셔야 합니다.
    // 예: fetch API, 다른 HTTP 클라이언트 라이브러리 등을 사용하여 구현 가능
    console.log("Fetching messages from the server...");
  };

  // 새 메시지를 보내는 함수
  const sendMessage = () => {
    if (stompClient.current && message) {
      const messageObj = {
        roomId: roomId,
        authorId: user.id, // 현재 사용자의 ID를 사용합니다.
        message: message,
        };
      console.log(user.id)
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(messageObj));
      setMessage(""); // 입력 필드 초기화
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-indigo-600 text-white p-4 shadow-md">
        <h2 className="text-xl font-semibold">Chat Room: {roomId}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.authorId === user.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.authorId === user.id ? 'bg-indigo-500 text-white' : 'bg-white'
            }`}>
              <p className="text-sm">{msg.message}</p>
              <span className="text-xs text-gray-500 mt-1 block">{msg.sender}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="bg-white border-t border-gray-200 px-4 py-4 sm:px-6">
        <div className="flex space-x-3">
          <button className="text-gray-400 hover:text-gray-600">
            😊
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
            placeholder="메시지를 입력하세요..."
          />
          <button
            onClick={sendMessage}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomPage;
