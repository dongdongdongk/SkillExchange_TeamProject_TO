import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../../redux/user/userAction";
import axios from "axios";
const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [showChatList, setShowChatList] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const size = 7;
  
  
  const lastChatRoomElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchChatRooms = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/v1/chatRoom/list?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      setChatRooms(prevChatRooms => [...prevChatRooms, ...response.data.chatRooms]);
      setHasMore(response.data.chatRooms.length === size);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      setLoading(false);
    }
  }, [page, isAuthenticated]);

  // useEffect(() => {
  //   fetchChatRooms();
  // }, [fetchChatRooms]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchChatRooms();
    } else {
      setChatRooms([]);
      setPage(1);
      setHasMore(true);
    }
  }, [isAuthenticated, fetchChatRooms]);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      localStorage.removeItem("accessToken");
      dispatch(clearUser()); // Redux action을 사용하여 사용자 정보 초기화
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER}/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log("Logout successful:", response.data);

      // 페이지 리로드
      window.location.replace("/");
    } catch (error) {}
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <header className="header">
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Link to="/">
            <img src="images/logo.svg" height="30" width="147" alt="logo" />
          </Link>
        </div>
        {/* navbar toggler */}
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          id="show-button"
          htmlFor="nav-toggle"
          className="order-1 flex cursor-pointer items-center lg:order-1 lg:hidden"
        >
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
        </label>
        <label
          id="hide-button"
          htmlFor="nav-toggle"
          className="order-2 hidden cursor-pointer items-center lg:order-1"
        >
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>
        {/* /navbar toggler */}
        <ul
          id="nav-menu"
          className="navbar-nav order-2 hidden w-full flex-[0_0_100%] lg:order-1 lg:flex lg:w-auto lg:flex-auto lg:justify-center lg:space-x-5"
        >
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              메인페이지
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/notice" className="nav-link">
              공지사항
            </Link>
          </li>
          <li className="nav-item">
            <a href="blog.html" className="nav-link">
              재능등록
            </a>
          </li>
          <li className="nav-item">
            <a href="features.html" className="nav-link">
              자유게시판
            </a>
          </li>
          <li className="nav-item">
            <a href="how-it-works.html" className="nav-link">
              모집해요
            </a>
          </li>
          <li className="nav-item">
            <a href="contact.html" className="nav-link">
              자주 묻는 질문
            </a>
          </li>
          <li className="nav-item mt-3.5 lg:hidden">
            <a
              className="btn btn-white btn-sm border-border"
              href="signin.html"
            >
              Sign Up Now
            </a>
          </li>
        </ul>

        <div className="order-1 ml-auto hidden items-center md:order-2 md:ml-0 lg:flex">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label="마이페이지"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              <button
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={handleLogout}
                aria-label="로그아웃"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
              
              <div className="relative">
                <button
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                  onClick={() => setShowChatList(!showChatList)}
                  aria-label="채팅"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>
                
                {showChatList && (
                  <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {chatRooms.map((room, index) => (
                        <div 
                          key={room.chatRoomId} 
                          className="chat-room-item p-2 hover:bg-gray-100"
                          ref={index === chatRooms.length - 1 ? lastChatRoomElementRef : null}
                        >
                          <Link to={`/chat/${room.chatRoomId}`} className="block">
                            {/* <h3 className="font-bold">채팅방 ID: {room.chatRoomId.slice(0, 8)}...</h3> */}
                            <p className="text-sm">마지막 메시지: {room.lastChatMesg?.message}</p>
                            <p className="text-xs text-gray-500">마지막 메시지 시간: {formatDate(room.lastChatMesg?.createdAt)}</p>
                            <div className="flex mt-2">
                              {room.chatRoomMembers.map(member => (
                                <div key={member.userId} className="mr-2">
                                  {/* <img src={member.profileImage || 'default-profile-image.jpg'} alt={member.userId} className="w-8 h-8 rounded-full" /> */}
                                  <p className="text-xs">{member.userId}</p>
                                </div>
                              ))}
                            </div>
                          </Link>
                        </div>
                      ))}
                      {loading && <p className="text-center py-2">Loading...</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link to="/sign-in" className="btn btn-primary btn-sm font-bold">
              로그인
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
