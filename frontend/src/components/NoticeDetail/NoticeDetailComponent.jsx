import React, { useMemo, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Comment = ({ comment, onReplayClick }) => (
  <div className="comment flex space-x-4 border-b border-border py-8">
    {comment && comment.imgUrl ? (
      <img
        src={comment.imgUrl}
        alt="Avatar Preview"
        className="h-[70px] w-[70px] rounded-full"
      />
    ) : (
      <img
        src="/images/users/user.png"
        alt="Avatar Preview"
        className="h-[70px] w-[70px] rounded-full"
      />
    )}
    <div>
      <h4 className="font-primary text-lg font-medium capitalize">
        {comment.userId}
      </h4>
      <p className="mt-2.5">
        {/* 댓글 작성 시간 (regDate) 표시 */}
        {new Date(comment.regDate).toLocaleString()}
        <button
          className="ml-4 text-primary"
          onClick={() => onReplayClick(comment.id)}
        >
          Replay
        </button>
      </p>
      <p className="mt-5">{comment.content}</p>
    </div>
  </div>
);

const CommentSection = ({ comments, onReplayClick }) => (
  <div className="comments">
    <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
      댓글
    </h3>
    {comments.map((comment) => (
      <div key={comment.id}>
        <Comment comment={comment} onReplayClick={onReplayClick} />
        {renderReplies(comment.children, onReplayClick)}
      </div>
    ))}
  </div>
);

const ReplayComment = ({ comment, onReplayClick }) => (
  <div className="comment ml-3 flex space-x-4 border-b border-border py-8">
    <img src="../images/icons/replay-arrow.svg" alt="commentArrow" />
    {/* <img
      src={comment.imgUrl}
      className="h-[70px] w-[70px] rounded-full"
      alt=""
    /> */}

    {comment && comment.imgUrl ? (
      <img
        src={comment.imgUrl}
        alt="Avatar Preview"
        className="h-[70px] w-[70px] rounded-full"
      />
    ) : (
      <img
        src="/images/users/user.png"
        alt="Avatar Preview"
        className="h-[70px] w-[70px] rounded-full"
      />
    )}

    <div>
      <h4 className="font-primary text-lg font-medium capitalize">
        {comment.userId}
      </h4>
      <p className="mt-2.5">
        {new Date(comment.regDate).toLocaleString()}
        <button
          className="ml-4 text-primary"
          onClick={() => onReplayClick(comment.id)}
        >
          Replay
        </button>
      </p>
      <p className="mt-5">{comment.content}</p>
    </div>
  </div>
);

const renderReplies = (replies, onReplayClick) =>
  replies &&
  replies.length > 0 && (
    <div className="ml-3">
      {replies.map((reply) => (
        <div key={reply.id}>
          <ReplayComment comment={reply} onReplayClick={onReplayClick} />
          {renderReplies(reply.children, onReplayClick)}
        </div>
      ))}
    </div>
  );

const NoticeDetailComponent = () => {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState({});
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [newCommentParentId, setNewCommentParentId] = useState("");
  const navigate = useNavigate();
  const avatar = null;

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_SERVER + `/v1/notices/${noticeId}`
        );
        setNotice(response.data);
        
        console.log(response.data)

      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    };

    // useParams로 가져온 noticeId를 사용하여 댓글 데이터를 불러오기 위한 함수
    const fetchCommentData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_SERVER + `/v1/comment/${noticeId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("댓글을 불러오는 중 에러 발생:", error);
      }
    };

    
    // 페이지 로드 시 데이터 불러오기
    fetchNoticeData();
    fetchCommentData();
  }, [noticeId]);
  
  const handleDeleteNotice = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // 현재 로그인한 사용자의 ID와 글 작성자의 ID를 비교하여 같으면 삭제 진행
      if (user && user.id === notice.writer) {
        const response = await axios.delete(
          process.env.REACT_APP_SERVER + `/v1/notices/${noticeId}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        // 삭제 성공 시 메시지 출력 및 페이지 이동 등 추가 동작 가능
        console.log(response.data);
        toast.success(response.data.returnMessage);
        navigate("/notice"); // 예시로 목록 페이지로 이동
      } else {
        toast.error("글을 삭제할 권한이 없습니다.");
      }
    } catch (error) {
      console.error("글 삭제 중 에러 발생:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      // accessToken 가져오기
      const accessToken = localStorage.getItem("accessToken");

      // 리퀘스트 값을 사용하여 새로운 댓글을 등록하는 POST 요청
      const response = await axios.post(
        process.env.REACT_APP_SERVER + `/v1/comment/register`,
        {
          noticeId: noticeId,
          parentId: newCommentParentId, // parentId가 없는 경우 최상위 댓글이 됩니다.
          writer: user.id,
          content: newCommentContent,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log(noticeId, newCommentParentId, user.id, newCommentContent);

      // 새로운 댓글이 등록된 후 댓글 목록을 다시 불러옵니다.
      const updatedComments = await axios.get(
        process.env.REACT_APP_SERVER + `/v1/comment/${noticeId}`
      );
      setComments(updatedComments.data);

      // 댓글 내용 입력 필드를 초기화합니다.
      setNewCommentContent("");
    } catch (error) {
      console.error("댓글을 등록하는 중 에러 발생:", error);
    }
  };

  const handleReplayClick = (parentId) => {
    // Replay 버튼이 클릭된 경우 해당 댓글의 ID를 parentId로 설정
    setNewCommentParentId(parentId);
    console.log(parentId);
  };

  return (
    <section className="section blog-single">
      <div className="container">
        <div className="row justify-center">
          <div className="lg:col-10">
            <img className="rounded-xl" src="images/blog-single.png" alt="" />
          </div>
          <div className="mt-10 max-w-[810px] lg:col-9">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="h2">{notice.title}</h1>
              {user && user.id === notice.writer && (
                <div className="flex space-x-2">
                  <Link to={`/notice-update/${notice.id}`}>
                    <button className="btn btn-outline-primary btn-sm">
                      글 수정
                    </button>
                  </Link>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleDeleteNotice}
                  >
                    글 삭제
                  </button>
                </div>
              )}
            </div>
            <div className="mb-5 mt-6 flex items-center space-x-2">
              <div className="blog-author-avatar h-[58px] w-[58px] rounded-full border-2 border-primary p-0.5">
                {notice && notice.avatar ? (
                  <img
                    src={notice.avatar}
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
                <p className="text-dark">{notice.writer}</p>
                <span className="text-sm">
                  {new Date(notice.regDate).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="content">
              <p>{notice.content}</p>
            </div>

            <div className="flex w-full flex-wrap items-center">
              <label htmlFor="upload">
                
              </label>
              {notice.imgUrl &&
                notice.imgUrl.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Notice Image ${index + 1}`}
                    className="m-2 h-[120px] w-[120px] object-cover"
                  />
                ))}
            </div>

            <CommentSection
              comments={comments}
              onReplayClick={handleReplayClick}
            />

            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <h5 className="h5 mb-4 mt-4 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
                댓글 등록
              </h5>
              <div className="form-group">
                <textarea
                  cols="30"
                  rows="10"
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
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

export default NoticeDetailComponent;
