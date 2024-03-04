import React, { useMemo, useEffect, useState } from "react";
import { Link, useParams  } from "react-router-dom";
import axios from "axios";

const Comment = ({ comment }) => (
  <div className="comment flex space-x-4 border-b border-border py-8">
    {/* 이미지 주소를 comment.imgUrl로 변경 */}
    <img
      src={comment.imgUrl}
      className="h-[70px] w-[70px] rounded-full"
      alt=""
    />
    <div>
      <h4 className="font-primary text-lg font-medium capitalize">
        {comment.userId}
      </h4>
      <p className="mt-2.5">
        {/* 댓글 작성 시간 (regDate) 표시 */}
        {comment.regDate}
        <a className="ml-4 text-primary" href="#">
          Replay
        </a>
      </p>
      <p className="mt-5">{comment.content}</p>
    </div>
  </div>
);

const CommentSection = ({ comments }) => (
  <div className="comments">
    <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
      댓글
    </h3>
    {comments.map((comment) => (
      <div key={comment.id}>
        <Comment comment={comment} />
        {renderReplies(comment.children)}
      </div>
    ))}
  </div>
);

const ReplayComment = ({ comment }) => (
  <div className="comment ml-3 flex space-x-4 border-b border-border py-8">
    <img src="../images/icons/replay-arrow.svg" alt="commentArrow" />
    <img
      src={comment.imgUrl}
      className="h-[70px] w-[70px] rounded-full"
      alt=""
    />
    <div>
      <h4 className="font-primary text-lg font-medium capitalize">
        {comment.userId}
      </h4>
      <p className="mt-2.5">
        {comment.regDate}
        <a className="ml-4 text-primary" href="#">
          Replay
        </a>
      </p>
      <p className="mt-5">{comment.content}</p>
    </div>
  </div>
);

const renderReplies = (replies) =>
  replies &&
  replies.length > 0 && (
    <div className="ml-3">
      {replies.map((reply) => (
        <div key={reply.id}>
          <ReplayComment comment={reply} />
          {renderReplies(reply.children)}
        </div>
      ))}
    </div>
  );

const NoticeDetailComponent = () => {
  const  noticeId  = useParams();
  const [notice, setNotice] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/noticeId/8`);
        setNotice(response.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    };

    // useParams로 가져온 noticeId를 사용하여 댓글 데이터를 불러오기 위한 함수
    const fetchCommentData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/comments`);
        setComments(response.data);
      } catch (error) {
        console.error("댓글을 불러오는 중 에러 발생:", error);
      }
    };

    // 페이지 로드 시 데이터 불러오기
    fetchNoticeData();
    fetchCommentData();
  }, [noticeId]);
  console.log(notice.title)

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
              <Link to="/notice-update">
                <button className="btn btn-outline-primary btn-sm">
                  글 수정
                </button>
              </Link>
            </div>
            <div className="mb-5 mt-6 flex items-center space-x-2">
              <div className="blog-author-avatar h-[58px] w-[58px] rounded-full border-2 border-primary p-0.5">
                <img src="../images/blog-author.png" alt="" />
              </div>
              <div>
                <p className="text-dark">{notice.writer}</p>
                <span className="text-sm">{notice.regDate}</span>
              </div>
            </div>

            <div className="content">
              <p>
              {notice.content}
              </p>

              {/* <div className="blockquote my-10 rounded-xl bg-white px-16 py-8 lg:px-20">
                <blockquote className="text-2xl text-dark">
                  대통령은 국가의 독립·영토의 보전·국가의 계속성과 헌법을 수호할
                  책무를 진다. 훈장등의 영전은 이를 받은 자에게만 효력이 있고,
                </blockquote>
                <p className="mb-0 mt-4">Darlene Robertson</p>
              </div> */}

              {/* <p>
                누구든지 병역의무의 이행으로 인하여 불이익한 처우를 받지
                아니한다. 정부는 회계연도마다 예산안을 편성하여 회계연도 개시
                90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를
                의결하여야 한다. 군인·군무원·경찰공무원 기타 법률이 정하는 자가
                전투·훈련등 직무집행과 관련하여 받은 손해에 대하여는 법률이
                정하는 보상외에 국가 또는 공공단체에 공무원의 직무상 불법행위로
                인한 배상은 청구할 수 없다. 국민경제자문회의의 조직·직무범위
                기타 필요한 사항은 법률로 정한다. 원장은 국회의 동의를 얻어
                대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할
                수 있다.
              </p>

              <p>
                국교는 인정되지 아니하며, 종교와 정치는 분리된다. 대통령은
                국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기
                위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여
                법률의 효력을 가지는 명령을 발할 수 있다. 국회의원의 선거구와
                비례대표제 기타 선거에 관한 사항은 법률로 정한다. 재의의 요구가
                있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과
                출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그
                법률안은 법률로서 확정된다. 의무교육은 무상으로 한다. 국회가
                재적의원 과반수의 찬성으로 계엄의 해제를 요구한 때에는 대통령은
                이를 해제하여야 한다.
              </p> */}
            </div>
            <CommentSection comments={comments} />
            {/* <div className="comments">
              <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
                댓글
              </h3>
              <div className="comment flex space-x-4 border-b border-border py-8">
                <img
                  src="images/comment-author-1.png"
                  className="h-[70px] w-[70px] rounded-full"
                  alt=""
                />
                <div>
                  <h4 className="font-primary text-lg font-medium capitalize">
                    ronin bishop
                  </h4>
                  <p className="mt-2.5">
                    April 18, 2020 at 6.25 pm
                    <a className="ml-4 text-primary" href="#">
                      Replay
                    </a>
                  </p>
                  <p className="mt-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec
                    et ipsum ullamcorper venenatis fringilla. Pretium, purus eu
                    nec vulputate vel habitant egestas.ornare ipsum
                  </p>
                </div>
              </div>
              <div className="comment flex space-x-4 py-8">
                <img src="images/icons/replay-arrow.svg" alt="commentArrow" />
                <img
                  src="images/comment-author-2.png"
                  className="h-[70px] w-[70px] rounded-full"
                  alt=""
                />
                <div>
                  <h4 className="font-primary text-lg font-medium capitalize">
                    Kathryn Murphy
                  </h4>
                  <p className="mt-2.5">
                    April 18, 2020 at 6.25 pm
                    <a className="ml-4 text-primary" href="#">
                      Replay
                    </a>
                  </p>
                  <p className="mt-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec
                    et ipsum ullamcorper venenatis fringilla. Pretium, purus eu
                    nec vulputate vel habitant egestas.ornare ipsum
                  </p>
                </div>
              </div>
            </div> */}
            <form className="comment-form" action="#" method="POST">
              <h5 className="h5 mb-4 mt-4 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
                댓글 등록
              </h5>
              <div className="form-group">
                <textarea cols="30" rows="10"></textarea>
              </div>
              {/* <div className="row mb-8">
                <div className="form-group mt-8 md:col-6 lg:col-4">
                  <input type="text" placeholder="Name" />
                </div>
                <div className="form-group mt-8 md:col-6 lg:col-4">
                  <input type="text" placeholder="Email" />
                </div>
                <div className="form-group mt-8 md:col-6 lg:col-4">
                  <input type="text" placeholder="Website" />
                </div>
              </div> */}
              {/* <div className="form-group relative flex pl-6">
                <input
                  className="absolute left-0 top-1"
                  type="checkbox"
                  id="save-info"
                />
                <label className="block" htmlFor="save-info">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </label>
              </div> */}
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
