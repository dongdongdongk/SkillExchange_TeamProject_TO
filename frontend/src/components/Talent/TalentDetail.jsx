// import React, { useState } from "react";
// import axios from "axios";
// import {useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";

// function TalentDetail() {
//     const { id } = useParams();
//     const [talentData , setTalentData] =useState();

//     useEffect(() => {

//         fetchData();
//       }, []);

//       const fetchData = async () => {
//         try {
//           const response = await axios.get(
//             process.env.REACT_APP_SERVER + `/v1/talent/${id}`,
//           );
//           setTalentData(response.data);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
//       console.log(talentData);

//   return (
//     <>
//       <img
//         className="floating-bubble-1 absolute right-0 top-0 -z-[1]"
//         src="/images/floating-bubble-1.svg"
//         alt=""
//       />
//       <img
//         className="floating-bubble-2 absolute left-0 top-[387px] -z-[1]"
//         src="/images/floating-bubble-2.svg"
//         alt=""
//       />
//       <img
//         className="floating-bubble-3 absolute right-0 top-[605px] -z-[1]"
//         src="/images/floating-bubble-3.svg"
//         alt=""
//       />
//       <section className="page-hero py-16">
//         <div className="container">
//           <div className="text-center">
//             <ul className="breadcrumb inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2">
//               <li className="leading-none text-dark">
//                 <a className="inline-flex items-center text-primary" href="#">
//                   <svg
//                     className="mr-1.5"
//                     width="15"
//                     height="15"
//                     viewBox="0 0 16 16"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z"
//                       fill="black"
//                     />
//                   </svg>
//                   <span className="text-sm leading-none">Home</span>
//                 </a>
//               </li>
//               <li className="leading-none text-dark">
//                 <span className="text-sm leading-none">/ Career</span>
//               </li>
//             </ul>
//           </div>
//           <div className="page-hero-content mx-auto max-w-[768px] text-center">
//             <h1 className="mb-5 mt-8">Lead UI/UX Designer</h1>
//           </div>
//         </div>
//       </section>
//       <section className="section career-single pt-0">
//         <div className="container">
//           <div className="row lg:gx-4">
//             <div className="lg:col-8">
//               <div className="career-single-content rounded-xl bg-white p-7 shadow-lg lg:px-12 lg:py-[60px]">
//                 <h5 className="h4 text-center mb-6">제목 : {talentData?.title}</h5>
//                 <p>
//                   {talentData?.content}
//                 </p>
//                 <h5 className="h5">About you</h5>
//                 <p>
//                   We are especially interested in finding developers with
//                   experience either building web APIs with Go or experience with
//                   functional programming (e.g. Elixir, NodeJS, Clojure, F#). You
//                   might not have experience with all the technologies in our
//                   stack, but you are motivated to learn deeply. You will get the
//                   opportunity to work with both Go and Elixir with experienced
//                   team mates who can teach and pair with you to learn whatever
//                   you have less experience with.You care about security, code
//                   quality, scalability, performance, and simplicity. Above all,
//                   you seek operational excellence and apply the best engineering
//                   practices possible. Not everything that you or your team do
//                   can be perfect, but you make sure that you always know the
//                   trade-offs.
//                 </p>
//                 <h5 className="h5">Your Role</h5>
//                 <p>
//                   We are looking for a personal financial planning pro
//                   (Certified Financial Planner™ preferred) who will lead our
//                   client advising efforts. on areas including: saving,
//                   retirement, debt management,
//                 </p>

//               </div>
//             </div>
//             <div className="career-single-sidebar mt-8 lg:col-4 lg:mt-0">
//               <div className="mb-8 rounded-xl bg-white px-7 py-10 shadow-lg">
//                 <h5 className="h5">Apply today</h5>
//                 <p className="mt-4">
//                   Management, investments. You’ll be on arguably the most
//                   important position at the company the front lines helping
//                 </p>
//                 <a className="btn btn-primary mt-6 block w-full" href="#">
//                   Apply Now
//                 </a>
//               </div>
//               <div className="mb-8 rounded-xl bg-white px-7 py-10 shadow-lg">
//                 <h5 className="h5">Sr. React Native Developer</h5>
//                 <p className="mt-6">
//                   Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
//                   lorem amet eget in netus laoreet
//                 </p>
//                 <ul className="mt-6 flex flex-wrap items-center text-dark">
//                   <li className="my-1 mr-8 inline-flex items-center">
//                     <svg
//                       className="mr-1"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 16 16"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z"
//                         fill="currentColor"
//                       />
//                     </svg>
//                     Full Time
//                   </li>
//                   <li className="my-1 mr-8 inline-flex items-center">
//                     <svg
//                       className="mr-1"
//                       width="16"
//                       height="20"
//                       viewBox="0 0 23 33"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M11.5007 0.970703C5.61504 0.970703 0.824219 5.75958 0.824219 11.6472C0.824219 20.1359 10.3612 31.2259 10.7669 31.6956L11.5007 32.5401L12.2345 31.6937C12.6402 31.2259 22.1772 20.1359 22.1772 11.6472C22.1772 5.75958 17.3863 0.970703 11.5007 0.970703ZM11.5007 29.5351C9.2761 26.7709 2.7654 18.1229 2.7654 11.6472C2.7654 6.83111 6.68463 2.91188 11.5007 2.91188C16.3167 2.91188 20.236 6.83111 20.236 11.6472C20.236 18.1171 13.7253 26.7709 11.5007 29.5351ZM11.5007 6.09347C8.28998 6.09347 5.67716 8.70629 5.67716 11.917C5.67716 15.1277 8.28998 17.7405 11.5007 17.7405C14.7114 17.7405 17.3242 15.1277 17.3242 11.917C17.3242 8.70629 14.7114 6.09347 11.5007 6.09347ZM11.5007 15.7993C9.35957 15.7993 7.61834 14.0581 7.61834 11.917C7.61834 9.77588 9.35957 8.03464 11.5007 8.03464C13.6418 8.03464 15.383 9.77588 15.383 11.917C15.383 14.0581 13.6418 15.7993 11.5007 15.7993Z"
//                         fill="currentColor"
//                       />
//                     </svg>
//                     San Francisco
//                   </li>
//                   <li className="my-1 mr-8">
//                     <a
//                       className="inline-flex items-center font-semibold text-primary"
//                       href="#"
//                     >
//                       Read More
//                       <img
//                         className="ml-1.5"
//                         src="/images/icons/arrow-right.svg"
//                         alt=""
//                       />
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div className="mb-8 rounded-xl bg-white px-7 py-10 shadow-lg">
//                 <h5 className="h5">Lead Brand Designer</h5>
//                 <p className="mt-6">
//                   Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
//                   lorem amet eget in netus laoreet
//                 </p>
//                 <ul className="mt-6 flex flex-wrap items-center text-dark">
//                   <li className="my-1 mr-8 inline-flex items-center">
//                     <svg
//                       className="mr-1"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 16 16"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z"
//                         fill="currentColor"
//                       />
//                     </svg>
//                     Full Time
//                   </li>
//                   <li className="my-1 mr-8 inline-flex items-center">
//                     <svg
//                       className="mr-1"
//                       width="16"
//                       height="20"
//                       viewBox="0 0 23 33"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M11.5007 0.970703C5.61504 0.970703 0.824219 5.75958 0.824219 11.6472C0.824219 20.1359 10.3612 31.2259 10.7669 31.6956L11.5007 32.5401L12.2345 31.6937C12.6402 31.2259 22.1772 20.1359 22.1772 11.6472C22.1772 5.75958 17.3863 0.970703 11.5007 0.970703ZM11.5007 29.5351C9.2761 26.7709 2.7654 18.1229 2.7654 11.6472C2.7654 6.83111 6.68463 2.91188 11.5007 2.91188C16.3167 2.91188 20.236 6.83111 20.236 11.6472C20.236 18.1171 13.7253 26.7709 11.5007 29.5351ZM11.5007 6.09347C8.28998 6.09347 5.67716 8.70629 5.67716 11.917C5.67716 15.1277 8.28998 17.7405 11.5007 17.7405C14.7114 17.7405 17.3242 15.1277 17.3242 11.917C17.3242 8.70629 14.7114 6.09347 11.5007 6.09347ZM11.5007 15.7993C9.35957 15.7993 7.61834 14.0581 7.61834 11.917C7.61834 9.77588 9.35957 8.03464 11.5007 8.03464C13.6418 8.03464 15.383 9.77588 15.383 11.917C15.383 14.0581 13.6418 15.7993 11.5007 15.7993Z"
//                         fill="currentColor"
//                       />
//                     </svg>
//                     San Francisco
//                   </li>
//                   <li className="my-1 mr-8">
//                     <a
//                       className="inline-flex items-center font-semibold text-primary"
//                       href="#"
//                     >
//                       Read More
//                       <img
//                         className="ml-1.5"
//                         src="/images/icons/arrow-right.svg"
//                         alt=""
//                       />
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default TalentDetail;

import React, { useMemo, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

// const Comment = ({ comment, onReplyClick, onDeleteComment, currentUserId }) => {
//   const isCurrentUserComment = currentUserId === comment.userId;
//   const { user } = useSelector((state) => state.user);
//   return (
//     <div className="comment flex space-x-4 border-b border-border py-8">
//       <Avatar imgUrl={comment.imgUrl} />
//       <div>
//         <h4 className="font-primary text-lg font-medium capitalize">
//           {comment.userId}
//         </h4>
//         <p className="mt-2.5">
//           {new Date(comment.regDate).toLocaleString()}
//           {user && ( // Check if user is logged in
//             <React.Fragment>
//               <button
//                 className="ml-4 text-primary"
//                 onClick={() => onReplyClick(comment.id)}
//               >
//                 Reply
//               </button>
//               {isCurrentUserComment && (
//                 <button
//                   className="ml-4 text-red-500"
//                   onClick={() => onDeleteComment(comment.id)}
//                 >
//                   Delete
//                 </button>
//               )}
//             </React.Fragment>
//           )}
//         </p>
//         <p className="mt-5">{comment.content}</p>
//       </div>
//     </div>
//   );
// };

// const Avatar = ({ imgUrl }) => (
//   <img
//     src={imgUrl || "/images/users/user.png"}
//     alt="Avatar Preview"
//     className="h-[52px] w-[55px] rounded-full"
//   />
// );

// const ReplyForm = ({
//   replyContent,
//   setReplyContent,
//   handleCancelReply,
//   handleReplySubmit,
//   parentId,
// }) => (
//   <>
//     <div>
//       <textarea
//         cols="30"
//         rows="3"
//         value={replyContent}
//         onChange={(e) => setReplyContent(e.target.value)}
//         placeholder="답글을 입력하세요..."
//       />
//     </div>
//     <button className="ml-2 mr-2" onClick={() => handleReplySubmit(parentId)}>
//       작성
//     </button>
//     <button onClick={handleCancelReply}>취소</button>
//   </>
// );

// const CommentList = ({
//   comments,
//   onReplyClick,
//   selectedCommentId,
//   showReplyInput,
//   replyContent,
//   setReplyContent,
//   handleCancelReply,
//   handleReplySubmit,
//   onDeleteComment,
//   currentUserId,
//   level = 0, // Added level parameter to track the nesting level
// }) => (
//   <div className={`comments`} style={{ marginLeft: `${level * 15}px` }}>
//     {comments.map((comment) => (
//       <div key={comment.id} className={`comment-level-${level}`}>
//         <div className="comment-container flex items-center">
//           <img
//             src="../images/icons/replay-arrow.svg"
//             alt="commentArrow"
//             className="comment-arrow mr-3"
//           />
//           <Comment
//             comment={comment}
//             onReplyClick={onReplyClick}
//             onDeleteComment={onDeleteComment}
//             currentUserId={currentUserId}
//           />
//         </div>
//         <div className="ml-12 mt-2">
//           {selectedCommentId === comment.id && showReplyInput && (
//             <ReplyForm
//               replyContent={replyContent}
//               setReplyContent={setReplyContent}
//               handleCancelReply={handleCancelReply}
//               handleReplySubmit={handleReplySubmit}
//               parentId={comment.id}
//             />
//           )}
//         </div>
//         {comment.children && (
//           <CommentList
//             comments={comment.children}
//             onReplyClick={onReplyClick}
//             selectedCommentId={selectedCommentId}
//             showReplyInput={showReplyInput}
//             replyContent={replyContent}
//             setReplyContent={setReplyContent}
//             handleCancelReply={handleCancelReply}
//             handleReplySubmit={handleReplySubmit}
//             onDeleteComment={onDeleteComment}
//             currentUserId={currentUserId}
//             level={level + 1} // Incrementing the level for nested comments
//           />
//         )}
//       </div>
//     ))}
//   </div>
// );

const TalentDetail = () => {
  // const { noticeId } = useParams();
  // const [notice, setNotice] = useState({});
  // const [comments, setComments] = useState([]);
  // const [newCommentContent, setNewCommentContent] = useState("");
  // const [newCommentParentId, setNewCommentParentId] = useState("");
  // const [showReplyInput, setShowReplyInput] = useState(false);
  // const [replyContent, setReplyContent] = useState("");
  // const [selectedCommentId, setSelectedCommentId] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { id } = useParams();
  const [talentData, setTalentData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + `/v1/talent/${id}`
      );
      setTalentData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(talentData);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [noticeResponse, commentsResponse] = await Promise.all([
  //         axios.get(`${process.env.REACT_APP_SERVER}/v1/notices/${noticeId}`),
  //         axios.get(`${process.env.REACT_APP_SERVER}/v1/comment/${noticeId}`),
  //       ]);

  //       setNotice(noticeResponse.data);
  //       setComments(commentsResponse.data);
  //     } catch (error) {
  //       console.error("데이터를 불러오는 중 에러 발생:", error);
  //     }
  //   };

  //   fetchData();
  // }, [noticeId]);

  // const handleDeleteNotice = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");

  //     if (user && user.id === notice.writer) {
  //       const response = await axios.delete(
  //         `${process.env.REACT_APP_SERVER}/v1/notices/${noticeId}`,
  //         {
  //           headers: {
  //             Authorization: accessToken,
  //           },
  //         }
  //       );

  //       console.log(response.data);
  //       toast.success(response.data.returnMessage);
  //       navigate("/notice");
  //     } else {
  //       toast.error("글을 삭제할 권한이 없습니다.");
  //     }
  //   } catch (error) {
  //     console.error("글 삭제 중 에러 발생:", error);
  //     toast.error(error.response.data.message);
  //   }
  // };

  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const userId = localStorage.getItem("userId");

  //     if (!user) {
  //       throw new Error("사용자가 로그인되어 있지 않습니다. 댓글을 등록하려면 먼저 로그인하세요.");
  //     }

  //     const response = await axios.post(
  //       `${process.env.REACT_APP_SERVER}/v1/comment/register`,
  //       {
  //         noticeId,
  //         parentId: newCommentParentId,
  //         writer: user.id,
  //         content: newCommentContent,
  //       },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: accessToken,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const updatedComments = await axios.get(
  //       `${process.env.REACT_APP_SERVER}/v1/comment/${noticeId}`
  //     );
  //     setComments(updatedComments.data);

  //     setNewCommentContent("");
  //     setNewCommentParentId("");
  //   } catch (error) {
  //     toast.error("사용자가 로그인되어 있지 않습니다. 댓글을 등록하려면 먼저 로그인하세요.");
  //   }
  // };

  // const handleReplyClick = (commentId) => {
  //   setSelectedCommentId(commentId);
  //   setShowReplyInput(true);
  //   setReplyContent("");
  // };

  // const handleCancelReply = () => {
  //   setSelectedCommentId(null);
  //   setShowReplyInput(false);
  //   setReplyContent("");
  // };

  // const handleReplySubmit = async (parentId) => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");

  //     const response = await axios.post(
  //       `${process.env.REACT_APP_SERVER}/v1/comment/register`,
  //       {
  //         noticeId,
  //         parentId,
  //         writer: user.id,
  //         content: replyContent,
  //       },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: accessToken,
  //         },
  //       }
  //     );

  //     const updatedComments = await axios.get(
  //       `${process.env.REACT_APP_SERVER}/v1/comment/${noticeId}`
  //     );
  //     setComments(updatedComments.data);

  //     setShowReplyInput(false);
  //     setReplyContent("");
  //   } catch (error) {
  //     console.error("댓글을 등록하는 중 에러 발생:", error);
  //   }
  // };

  // const handleDeleteComment = async (commentId) => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");

  //     const response = await axios.delete(
  //       `${process.env.REACT_APP_SERVER}/v1/comment/${commentId}`,
  //       {
  //         headers: {
  //           Authorization: accessToken,
  //         },
  //       }
  //     );

  //     toast.success(response.data.returnMessage);

  //     const updatedComments = await axios.get(
  //       `${process.env.REACT_APP_SERVER}/v1/comment/${noticeId}`
  //     );
  //     setComments(updatedComments.data);
  //   } catch (error) {
  //     console.error("댓글 삭제 중 에러 발생:", error);
  //     toast.error(error.response.data.message);
  //   }
  // };

  return (
    <section className="section career-single">
      <div className="container">
        <div className="row lg:gx-4">
          <div className="lg:col-8">
            <img className="rounded-xl" src="images/blog-single.png" alt="" />
          </div>
          <div className="mt-10  lg:col-12">
            <div className="mb-4 rounded-lg border-2 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="h2">{talentData?.title}</h1>
                {user && user.id === talentData?.writer && (
                  <div className="flex space-x-2">
                    <Link to={`/notice-update/${talentData.id}`}>
                      <button className="btn btn-outline-primary btn-sm">
                        글 수정
                      </button>
                    </Link>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={""}
                      // handleDeleteNotice
                    >
                      글 삭제
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-6 flex items-center space-x-2">
                <div className="blog-author-avatar h-[58px] w-[58px] rounded-full border-2 border-primary p-0.5">
                  {talentData && talentData.avatar ? (
                    <img
                      src={talentData.avatar}
                      alt="Avatar Preview"
                      className="h-[52px] w-[55px] rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src="/images/users/user.png"
                      alt="Avatar Preview"
                      className="h-[52px] w-[55px] rounded-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-dark">{talentData?.writer}</p>
                  <span className="text-sm">
                    {new Date(talentData?.regDate).toLocaleString()}
                  </span>
                </div>
                <div className="">
                  <li class="my-1 mr-8 inline-flex items-center">
                    <svg
                      class="mr-1"
                      width="16"
                      height="20"
                      viewBox="0 0 23 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5007 0.970703C5.61504 0.970703 0.824219 5.75958 0.824219 11.6472C0.824219 20.1359 10.3612 31.2259 10.7669 31.6956L11.5007 32.5401L12.2345 31.6937C12.6402 31.2259 22.1772 20.1359 22.1772 11.6472C22.1772 5.75958 17.3863 0.970703 11.5007 0.970703ZM11.5007 29.5351C9.2761 26.7709 2.7654 18.1229 2.7654 11.6472C2.7654 6.83111 6.68463 2.91188 11.5007 2.91188C16.3167 2.91188 20.236 6.83111 20.236 11.6472C20.236 18.1171 13.7253 26.7709 11.5007 29.5351ZM11.5007 6.09347C8.28998 6.09347 5.67716 8.70629 5.67716 11.917C5.67716 15.1277 8.28998 17.7405 11.5007 17.7405C14.7114 17.7405 17.3242 15.1277 17.3242 11.917C17.3242 8.70629 14.7114 6.09347 11.5007 6.09347ZM11.5007 15.7993C9.35957 15.7993 7.61834 14.0581 7.61834 11.917C7.61834 9.77588 9.35957 8.03464 11.5007 8.03464C13.6418 8.03464 15.383 9.77588 15.383 11.917C15.383 14.0581 13.6418 15.7993 11.5007 15.7993Z"
                        fill="currentColor"
                      />
                    </svg>
                    희망 위치 : {talentData?.placeName}
                  </li>
                </div>
                <div>
                  희망 성별 : {talentData?.gender}
                </div>
                <div>
                  희망 요일 : {talentData?.gender}
                </div>
              </div>
            </div>

            <div className="content min-h-[300px] rounded-lg border-2 bg-white p-4">
              <p>{talentData?.content}</p>
            </div>

            <div className="flex w-full flex-wrap items-center">
              <label htmlFor="upload"></label>
              {talentData?.imgUrl &&
                talentData?.imgUrl.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Notice Image ${index + 1}`}
                    className="m-2 h-[120px] w-[120px] object-cover"
                  />
                ))}
            </div>
            <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
              댓글
            </h3>

            {/* <CommentList
              comments={comments}
              onReplyClick={handleReplyClick}
              selectedCommentId={selectedCommentId}
              showReplyInput={showReplyInput}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleCancelReply={handleCancelReply}
              handleReplySubmit={handleReplySubmit}
              onDeleteComment={handleDeleteComment}
              currentUserId={user?.id}
            /> */}

            <form className="comment-form" onSubmit={""}>
              {/* handleCommentSubmit */}
              <h5 className="h5 mb-4 mt-4 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
                댓글 등록
              </h5>
              <div className="form-group">
                <textarea
                  cols="30"
                  rows="10"
                  value={""}
                  // newCommentContent
                  // onChange={(e) => setNewCommentContent(e.target.value)}
                ></textarea>
              </div>

              <input
                type="Submit"
                className="btn btn-primary mt-4 min-w-[189px] cursor-pointer"
                value="댓글 등록"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentDetail;
