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
        authorId: currentUser.userId, // 현재 사용자의 ID를 사용합니다.
        message: message,
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(messageObj));
      setMessage(""); // 입력 필드 초기화
    }
  };

  return (
    <div className="chatAppContainer">
      {/* 채팅 메시지 출력 부분 */}
      <div className="chatMessagesContainer">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p>{msg.message}</p>
            <span>{msg.sender}</span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* 메시지 입력 부분 */}
      <div className="chatInputContainer">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default ChatRoomPage;
