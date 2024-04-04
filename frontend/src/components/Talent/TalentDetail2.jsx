import React, { useMemo, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

// Floating Assets 컴포넌트
const FloatingAssets = () => {
  return (
    <>
      <img
        className="floating-bubble-1 absolute right-0 top-0 -z-[1]"
        src="images/floating-bubble-1.svg"
        alt=""
      />
      <img
        className="floating-bubble-2 absolute left-0 top-[387px] -z-[1]"
        src="images/floating-bubble-2.svg"
        alt=""
      />
      <img
        className="floating-bubble-3 absolute right-0 top-[605px] -z-[1]"
        src="images/floating-bubble-3.svg"
        alt=""
      />
    </>
  );
};

// CommonHero 컴포넌트
const CommonHero = () => {
  return (
    <section className="page-hero py-16">
      <div className="container">
        <div className="text-center">
          {/* Breadcrumb */}
          <ul className="breadcrumb inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2">
            <li className="leading-none text-dark">
              <a className="inline-flex items-center text-primary" href="#">
                <svg
                  className="mr-1.5"
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Home 아이콘 */}
                  <path
                    d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z"
                    fill="black"
                  />
                </svg>
                <span className="text-sm leading-none">Home</span>
              </a>
            </li>
            <li className="leading-none text-dark">
              <span className="text-sm leading-none">/ 재능 상세</span>
            </li>
          </ul>
        </div>
        {/* <div className="page-hero-content mx-auto max-w-[768px] text-center">
          <h1 className="mb-5 mt-8">Lead UI/UX Designer</h1>
        </div> */}
      </div>
    </section>
  );
};

// CareerSingle 컴포넌트
const CareerSingle = ({ talentData, user }) => {
  return (
    <section className="section career-single pt-0">
      <div className="container">
        <div className="row lg:gx-4">
          <div className="lg:col-8">
            <div className="career-single-content mb-3 rounded-xl border-2 bg-white p-3 lg:px-12 lg:py-[30px]">
              {/* 유저 파트 */}
              <div className="mb-4 flex items-center justify-between">
                <h1 className="h3">{talentData?.title}</h1>
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
              </div>
            </div>

            {/* 내용 파트 */}
            <div className="career-single-content min-h-[300px] rounded-xl border-2  bg-white p-7 lg:px-12 lg:py-[60px]">
              <p>{talentData?.content}</p>
            </div>
          </div>
          {/* 사이드바 */}
          <div className="career-single-sidebar mt-8 lg:col-4 lg:mt-0">
            {/* 상세정보 섹션 */}
            <div className="mb-8 rounded-xl border-2 bg-white px-7 py-10">
              <h5 className="h5">상세 정보</h5>
              <div className="mt-6 text-dark">
                <div className="my-1 mb-4 flex items-center">
                  {/* 희망 요일 */}
                  <svg
                    className="mr-1"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z"
                      fill="currentColor"
                    />
                  </svg>
                  {/* 선택된 요일 출력 */}
                  <span>
                    희망 요일:{" "}
                    {talentData?.selectedDays
                      .map((day, index) => {
                        // 각 요일에 해당하는 한국어로 변환
                        switch (day) {
                          case "MON":
                            return "월요일";
                          case "TUE":
                            return "화요일";
                          case "WED":
                            return "수요일";
                          case "THU":
                            return "목요일";
                          case "FRI":
                            return "금요일";
                          case "SAT":
                            return "토요일";
                          case "SUN":
                            return "일요일";
                          default:
                            return day;
                        }
                      })
                      .join(", ")}
                  </span>
                </div>

                {/* 희망 지역 */}
                <div className="my-1 mb-4 flex items-center">
                  <svg
                    className="mr-1"
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
                  <span>희망 지역 : {talentData?.placeName}</span>
                </div>

                {/* 희망 성별 */}
                <div className="my-1 mb-4 flex items-center">
                  <svg
                    className="mr-1"
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
                  <span>
                  희망 성별 : {(() => {
                      switch (talentData?.gender) {
                        case "MALE":
                          return "남성";
                        case "FEMALE":
                          return "여성";
                        case "UNKNOWN":
                          return "무관";
                        default:
                          return talentData?.gender;
                      }
                    })()}
                  </span>
                </div>
                {/* 희망 연령 */}
                <div className="my-1 mb-4 flex items-center">
                  <svg
                    className="mr-1"
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
                  <span>
                    희망 연령 : {talentData?.minAge}세 ~ {talentData?.maxAge}세
                  </span>
                </div>
                {/* <div className="my-1">
                  <a
                    className="inline-flex items-center font-semibold text-primary"
                    href="#"
                  >
                    Read More
                    <img
                      className="ml-1.5"
                      src="images/icons/arrow-right.svg"
                      alt=""
                    />
                  </a>
                </div> */}
              </div>
              <a className="btn btn-primary mt-6 block w-full" href="#">
                쪽지 보내기
              </a>
            </div>
            {/* Sr. React Native Developer 섹션 */}

            {/* Lead Brand Designer 섹션 */}
          </div>
        </div>
      </div>
    </section>
  );
};

// 전체 페이지 컴포넌트
const TalentDetail2 = () => {
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

  return (
    <div>
      <FloatingAssets />
      <CommonHero />
      <CareerSingle talentData={talentData} user={user} />
    </div>
  );
};

export default TalentDetail2;
