import React from "react";

const data = {
  id: 8,
  writer: "admin",
  title: "공지합니다",
  content: "유저를 늘리세요",
  regDate: "2024-02-29T08:48:31.702298",
  modDate: "2024-02-29T08:48:31.702298",
  imgUrl: [
    "https://skillexcahnge.s3.ap-northeast-2.amazonaws.com/images/mang.jpg",
    "https://skillexcahnge.s3.ap-northeast-2.amazonaws.com/images/%EB%A7%9D%EA%B8%80%EC%9D%B41.jpg",
  ],
  returnCode: 200,
  returnMessage: "조회하는데 성공하였습니다.",
};

const commentData = [
  {
    id: 1,
    content: "댓글 작성합니다.",
    userId: "alswl3359",
    imgUrl:
      "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
    children: [
      {
        id: 4,
        content: "댓글 되나요.",
        userId: "alswl3359",
        imgUrl:
          "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
        children: [
          {
            id: 5,
            content: "아주 잘되는듯? 대댓글~.",
            userId: "alswl3359",
            imgUrl:
              "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
            children: [
              {
                id: 6,
                content: "댓글 작성합니다222222222.",
                userId: "alswl3359",
                imgUrl:
                  "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    content: "머리아파용.",
    userId: "alswl3359",
    imgUrl:
      "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
    children: [
      {
        id: 8,
        content: "대댓글을 작성해보자",
        userId: "alswl3359",
        imgUrl:
          "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
        children: [],
      },
    ],
  },
];

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
    {comment.children && comment.children.length > 0 && (
      <div className="ml-8">
        {comment.children.map((childComment) => (
          <Comment key={childComment.id} comment={childComment} />
        ))}
      </div>
    )}
  </div>
);

const CommentSection = ({ comments }) => (
  <div className="comments">
    <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
      댓글
    </h3>
    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </div>
);

const NoticeDetailComponent = () => {
  return (
    <section className="section blog-single">
      <div className="container">
        <div className="row justify-center">
          <div className="lg:col-10">
            <img className="rounded-xl" src="images/blog-single.png" alt="" />
          </div>
          <div className="mt-10 max-w-[810px] lg:col-9">
            <h1 className="h2">{data.title}</h1>
            <div className="mb-5 mt-6 flex items-center space-x-2">
              <div className="blog-author-avatar h-[58px] w-[58px] rounded-full border-2 border-primary p-0.5">
                <img src="images/blog-author.png" alt="" />
              </div>
              <div>
                <p className="text-dark">김동현</p>
                <span className="text-sm">{data.regDate}</span>
              </div>
            </div>

            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec et
                ipsum ullamcorper venenatis fringilla. Pretium, purus eu nec
                vulputate vel habitant egestas. Congue ornare at ipsum, viverra.
                Vitae magna faucibus eros, lectus sociis. Etiam nunc amet id
                dignissim. Feugiat id tempor vel sit in ornare turpis posuere.
                Eu quisque integer non rhoncus elementum vel. Quis nec viverra
                lectus augue nec praesent Laoreet mauris odio ut nec. Nisl, sed
                adipiscing dignissim arcu placerat ornare pharetra nec in.
                Ultrices in nisl potenti vitae tempus. Auctor consectetur luctus
                eu in amet sagittis. Dis urna, vel hendrerit convallis Senectus
                feugiat faucibus commodo egestas leo vitae in morbi. Enim arcu
                dignissim mauris, eu, eget
              </p>

              <div className="blockquote my-10 rounded-xl bg-white px-16 py-8 lg:px-20">
                <blockquote className="text-2xl text-dark">
                  A wise girls her limit to touch.To Repellat neque praesentium
                  .The me an idea, so I as quickly To get.
                </blockquote>
                <p className="mb-0 mt-4">Darlene Robertson</p>
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec et
                ipsum ullamcorper venenatis fringilla. Pretium, purus eu nec
                vulputate vel habitant egestas. Congue ornare at ipsum, viverra.
                Vitae magna faucibus eros, lectus sociis. Etiam nunc amet id
                dignissim. Feugiat id tempor vel sit in ornare turpis posuere.
                Eu quisque integer non rhoncus elementum vel. Quis nec viverra
                lectus augue nec praesent volutpat tortor. Ipsum eget sed tempus
                luctus nisl. Ut etiam molestie mattis at faucibus mi at
                pellentesque. Pellentesque morbi nunc, curabitur arcu euismod
                suscipit. Duis mi sapien, nisl, pulvinar donec non dictum
              </p>

              <p>
                Laoreet mauris odio ut nec. Nisl, sed adipiscing dignissim arcu
                placerat ornare pharetra nec in. Ultrices in nisl potenti vitae
                tempus. Auctor consectetur luctus eu in amet sagittis. Dis urna,
                vel hendrerit convallis cursus id. Senectus feugiat faucibus
                commodo egestas leo vitae in morbi. Enim arcu dignissim mauris,
                eu, eget pharetra odio amet pellentesque. Egestas nisi
                adipiscing sed in lectus. Vitae ultrices malesuada aliquet
                dignissim. Faucibus non tristique eu.
              </p>
            </div>
            <CommentSection comments={commentData} />
            <div className="comments">
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
            </div>
            <form className="comment-form" action="#" method="POST">
              <p className="mb-4">LEAVE A REPLAY</p>
              <div className="form-group">
                <textarea cols="30" rows="10"></textarea>
              </div>
              <div className="row mb-8">
                <div className="form-group mt-8 md:col-6 lg:col-4">
                  <input type="text" placeholder="Name" />
                </div>
                <div className="form-group mt-8 md:col-6 lg:col-4">
                  <input type="text" placeholder="Email" />
                </div>
                <div className="form-group mt-8 md:col-6 lg:col-4">
                  <input type="text" placeholder="Website" />
                </div>
              </div>
              <div className="form-group relative flex pl-6">
                <input
                  className="absolute left-0 top-1"
                  type="checkbox"
                  id="save-info"
                />
                <label className="block" htmlFor="save-info">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </label>
              </div>
              <input
                type="Submit"
                className="btn btn-primary mt-8 min-w-[189px] cursor-pointer"
                value="Post Comment"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeDetailComponent;
