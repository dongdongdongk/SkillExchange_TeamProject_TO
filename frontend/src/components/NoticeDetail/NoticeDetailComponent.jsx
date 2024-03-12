import React, { useMemo, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Comment = ({ comment, onReplyClick, onDeleteComment, currentUserId }) => {
  const isCurrentUserComment = currentUserId === comment.userId;

  return (
    <div className="comment flex space-x-4 border-b border-border py-8">
      <Avatar imgUrl={comment.imgUrl} />
      <div>
        <h4 className="font-primary text-lg font-medium capitalize">
          {comment.userId}
        </h4>
        <p className="mt-2.5">
          {new Date(comment.regDate).toLocaleString()}
          {comment.userId && (  // Check if comment.userId is not null or undefined
            <button
              className="ml-4 text-primary"
              onClick={() => onReplyClick(comment.id)}
            >
              Replay
            </button>
          )}
          {isCurrentUserComment && (
            <button
              className="ml-4 text-red-500"
              onClick={() => onDeleteComment(comment.id)}
            >
              Delete
            </button>
          )}
        </p>
        <p className="mt-5">{comment.content}</p>
      </div>
    </div>
  );
};

const Avatar = ({ imgUrl }) => (
  <img
    src={imgUrl || "/images/users/user.png"}
    alt="Avatar Preview"
    className="h-[52px] w-[55px] rounded-full"
  />
);

const ReplyForm = ({
  replyContent,
  setReplyContent,
  handleCancelReply,
  handleReplySubmit,
  parentId,
}) => (
  <>
    <div>
      <textarea
        cols="30"
        rows="3"
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="답글을 입력하세요..."
      />
    </div>
    <button className="ml-2 mr-2" onClick={() => handleReplySubmit(parentId)}>
      작성
    </button>
    <button onClick={handleCancelReply}>취소</button>
  </>
);

const CommentList = ({
  comments,
  onReplyClick,
  selectedCommentId,
  showReplyInput,
  replyContent,
  setReplyContent,
  handleCancelReply,
  handleReplySubmit,
  onDeleteComment,
  currentUserId,
  level = 0, // Added level parameter to track the nesting level
}) => (
  <div className={`comments`} style={{ marginLeft: `${level * 15}px` }}>
    {comments.map((comment) => (
      <div key={comment.id} className={`comment-level-${level}`}>
        <div className="comment-container flex items-center">
          <img
            src="../images/icons/replay-arrow.svg"
            alt="commentArrow"
            className="comment-arrow mr-3"
          />
          <Comment
            comment={comment}
            onReplyClick={onReplyClick}
            onDeleteComment={onDeleteComment}
            currentUserId={currentUserId}
          />
        </div>
        <div className="ml-12 mt-2">
          {selectedCommentId === comment.id && showReplyInput && (
            <ReplyForm
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleCancelReply={handleCancelReply}
              handleReplySubmit={handleReplySubmit}
              parentId={comment.id}
            />
          )}
        </div>
        {comment.children && (
          <CommentList
            comments={comment.children}
            onReplyClick={onReplyClick}
            selectedCommentId={selectedCommentId}
            showReplyInput={showReplyInput}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            handleCancelReply={handleCancelReply}
            handleReplySubmit={handleReplySubmit}
            onDeleteComment={onDeleteComment}
            currentUserId={currentUserId}
            level={level + 1} // Incrementing the level for nested comments
          />
        )}
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
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticeResponse, commentsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_SERVER}/v1/notices/${noticeId}`),
          axios.get(`${process.env.REACT_APP_SERVER}/v1/comment/${noticeId}`),
        ]);

        setNotice(noticeResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    };

    fetchData();
  }, [noticeId]);

  const handleDeleteNotice = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (user && user.id === notice.writer) {
        const response = await axios.delete(
          `${process.env.REACT_APP_SERVER}/v1/notices/${noticeId}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        console.log(response.data);
        toast.success(response.data.returnMessage);
        navigate("/notice");
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
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/v1/comment/register`,
        {
          noticeId,
          parentId: newCommentParentId,
          writer: user.id,
          content: newCommentContent,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedComments = await axios.get(
        `${process.env.REACT_APP_SERVER}/v1/comment/${noticeId}`
      );
      setComments(updatedComments.data);

      setNewCommentContent("");
      setNewCommentParentId("");
    } catch (error) {
      console.error("댓글을 등록하는 중 에러 발생:", error);
    }
  };

  const handleReplyClick = (commentId) => {
    setSelectedCommentId(commentId);
    setShowReplyInput(true);
    setReplyContent("");
  };

  const handleCancelReply = () => {
    setSelectedCommentId(null);
    setShowReplyInput(false);
    setReplyContent("");
  };

  const handleReplySubmit = async (parentId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/v1/comment/register`,
        {
          noticeId,
          parentId,
          writer: user.id,
          content: replyContent,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: accessToken,
          },
        }
      );

      const updatedComments = await axios.get(
        `${process.env.REACT_APP_SERVER}/v1/comment/${noticeId}`
      );
      setComments(updatedComments.data);

      setShowReplyInput(false);
      setReplyContent("");
    } catch (error) {
      console.error("댓글을 등록하는 중 에러 발생:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER}/v1/comment/${commentId}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      toast.success(response.data.returnMessage);

      const updatedComments = await axios.get(
        `${process.env.REACT_APP_SERVER}/v1/comment/${noticeId}`
      );
      setComments(updatedComments.data);
    } catch (error) {
      console.error("댓글 삭제 중 에러 발생:", error);
      toast.error(error.response.data.message);
    }
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
              <label htmlFor="upload"></label>
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
            <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
              댓글
            </h3>

            <CommentList
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
