import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const CategorySelect = ({ fetchPostsWithCategory }) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const categoryRef = useRef(null);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + `/v1/subjectCategory/list`
      );
      setMainCategories(response.data);
    } catch (error) {
      console.error("카테고리 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleMainCategoryClick = (category) => {
    setSelectedMainCategory(
      selectedMainCategory === category ? null : category
    );
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    fetchPostsWithCategory(subCategory.id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setSelectedMainCategory(null);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={categoryRef}>
      <div className="flex justify-center">
        {mainCategories.map((category) => (
          <div
            key={category.id}
            className="relative mx-5 cursor-pointer"
            onClick={() => handleMainCategoryClick(category)}
          >
            <img src={`/icons/${category.name}.png`} alt={category.name} />
            {selectedMainCategory === category && (
              <div className="absolute top-full left-0 z-10 mt-2 w-64 rounded-md bg-white shadow-lg">
                <ul className="grid grid-cols-2 gap-2">
                  {category.children.map((subCategory) => (
                    <li
                      key={subCategory.id}
                      className="px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSubCategoryClick(subCategory)}
                    >
                      {subCategory.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedSubCategory && (
        <div className="mt-4 text-center">
          선택한 하위 카테고리: {selectedSubCategory.name}
        </div>
      )}
    </div>
  );
};



const Integrations = () => {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(9);

  
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/v1/talent/list?limit=${limit}&skip=${skip}`
      );
      setPosts(response.data.content);
      setTotalCount(response.data.totalElements);
    } catch (error) {
      console.error("포스트를 불러오는 동안 오류가 발생했습니다:", error);
    }
  };

  const fetchPostsWithCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/v1/talent/list?limit=${limit}&skip=${skip}&subjectCategoryId=${categoryId}`
      );
      setPosts(response.data.content);
      setTotalCount(response.data.totalElements);
    } catch (error) {
      console.error("포스트를 불러오는 동안 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, limit]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const newSkip = (page - 1) * limit;
    setSkip(newSkip);
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      <CategorySelect fetchPostsWithCategory={fetchPostsWithCategory}/>
      <div className="">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  border-gray-200  lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => {
              // 현재 날짜와 regDate의 차이 계산
              const diffInMs = new Date() - new Date(post.regDate);
              const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
              const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
              const diffInWeeks = Math.round(diffInDays / 7);
              const diffInMonths = Math.round(diffInDays / 30);
              const diffInYears = Math.round(diffInDays / 365);

              // 표시할 시간 단위 선택
              let timeAgo = "";
              if (diffInYears > 1) {
                timeAgo = `${diffInYears} 년전`;
              } else if (diffInMonths > 1) {
                timeAgo = `${diffInMonths} 달전`;
              } else if (diffInWeeks > 1) {
                timeAgo = `${diffInWeeks} 주전`;
              } else if (diffInDays > 1) {
                timeAgo = `${diffInDays} 일전`;
              } else if (diffInHours > 1) {
                timeAgo = `${diffInHours} 시간전`;
              } else {
                timeAgo = "방금전";
              }

              return (
                
                <Link
                  key={post.id}
                  to={`/talent/${post.id}`}
                  className="flex h-full max-w-xl flex-col items-start justify-between rounded-lg border-2"
                >
                  <article className="h-full w-full">
                    <div className="h-full max-w-full rounded-md bg-white p-8 ">
                      <div className="mb-5 mt-3 flex items-center justify-center gap-x-4 text-xs">
                        <a
                          href="#"
                          className="btn-primary  rounded-full bg-gray-50 px-3 py-1.5 font-medium text-white hover:bg-gray-100"
                        >
                          {post.teachingSubject}
                        </a>

                        <a className="inline-flex items-center font-semibold text-primary">
                          <img
                            className="ml-1.5"
                            src="/images/icons/arrow-right.svg"
                          />
                        </a>

                        <a
                          href="#"
                          className="btn-primary  rounded-full bg-gray-50 px-3 py-1.5 font-medium text-white hover:bg-gray-100"
                        >
                          {post.teachedSubject}
                        </a>
                      </div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 ">
                          <a href="#">
                            <span className="absolute inset-0" />
                            {post.title}
                          </a>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {post.content}
                        </p>
                      </div>
                      <div className="relative mt-8 flex items-center justify-between gap-x-4">
                        {post.avatar ? (
                          <img
                            src={post.avatar}
                            alt=""
                            className="h-10 w-10 rounded-full border-2 border-primary bg-gray-50 p-0.5"
                          />
                        ) : (
                          <img
                            src="/images/users/user.png"
                            alt="Default Avatar"
                            className="h-10 w-10 rounded-full border-2 border-primary bg-gray-50 p-0.5"
                          />
                        )}
                        <div className="text-sm leading-6 flex-grow">
                          <p className="font-semibold text-gray-900">
                            <a href="#">
                              <span className="absolute inset-0" />
                              {post.writer}
                            </a>
                          </p>
                          <p className="text-gray-600">
                            {post.placeName} {post.ageGroup}
                          </p>
                        </div>
                        <div>
                          <time
                            dateTime={post.regDate}
                            className="text-gray-500"
                          >
                            {timeAgo}
                          </time>
                          </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-red-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              aria-current="page"
              className={`${
                currentPage === i + 1
                  ? "z-10 bg-red-50 text-gray-600 "
                  : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-red-50"
              } relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-red-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Integrations;