import React, { useState, useEffect } from "react";
import axios from "axios";

const IntegrationBox = ({ imageSrc, title, category, description }) => {
  return (
    <div className="integration-tab-item mb-8 md:col-6 lg:col-3" data-groups={`["${category}"]`}>
      <div className="rounded-xl bg-white px-10 pb-8 pt-11 shadow-lg max-h-[350px] min-h-[350px]">
        <div className="integration-card-head flex items-center space-x-4">
          <img src={imageSrc} alt="" />
          <div>
            <h4 className="h5">{title}</h4>
            <span className="font-medium">카테고리 : {category}</span>
          </div>
        </div>
        <div className="my-5 border-y border-border py-5">
          <p>{description}</p>
        </div>
        <a className="inline-flex items-center font-semibold text-dark" href="#">
          글 상세보기 
          <svg
            className="ml-1.5"
            width="13"
            height="16"
            viewBox="0 0 13 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289L6.34315 0.928932C5.95262 0.538408 5.31946 0.538408 4.92893 0.928932C4.53841 1.31946 4.53841 1.95262 4.92893 2.34315L10.5858 8L4.92893 13.6569C4.53841 14.0474 4.53841 14.6805 4.92893 15.0711C5.31946 15.4616 5.95262 15.4616 6.34315 15.0711L12.7071 8.70711ZM0 9H12V7H0V9Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

const Integrations = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER +"/v1/talent/list?limit=20&skip=0");
        setPosts(response.data.content);
      } catch (error) {
        console.error("포스트를 불러오는 동안 오류가 발생했습니다:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
      <div className="">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  border-gray-200  lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between shadow-lg rounded-md">
               <div className="p-5 bg-slate-100">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.regDate} className="text-gray-500">
                    {new Date(post.regDate).toLocaleString()}
                  </time>
                  <a
                    href="#"
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-white hover:bg-gray-100 btn-primary"
                  >
                    {post.teachingSubject}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {/* {post.title} */}
                      피아노 선생님 구합니다
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.writerAvatar} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {post.writer}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.placeName} {post.ageGroup}</p>
                  </div>
                </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Integrations;