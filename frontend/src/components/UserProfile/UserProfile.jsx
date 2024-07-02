import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import PasswordModal from "./PasswordModal";
import { Link } from "react-router-dom";
import ApproveModal from "./ApproveModal ";

const UserProfile = () => {
  const [job, setJob] = useState("");
  const [preferredSubject, setPreferredSubject] = useState("");
  const [mySubject, setMySubject] = useState("");
  const [gender, setGender] = useState("");
  const [careerSkills, setCareerSkills] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const fileInputRef = useRef(null);

  const [scrapList, setScrapList] = useState([]);
  const [exchangeRequests, setExchangeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setJob(user.job || "");
      setPreferredSubject(user.preferredSubject || "");
      setMySubject(user.mySubject || "");
      setGender(user.gender || "");
      setCareerSkills(user.careerSkills || "");
      setAvatar(user.imgUrl || "");
    }
    fetchScrapList();
    fetchExchangeRequests();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "job":
        setJob(value);
        break;
      case "preferredSubject":
        setPreferredSubject(value);
        break;
      case "mySubject":
        setMySubject(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "careerSkills":
        setCareerSkills(value);
        break;
      default:
        break;
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setShowApproveModal(true);
  };

  const handleApproveModalClose = () => {
    setShowApproveModal(false);
    setSelectedRequest(null);
  };

  const handleApproveRequest = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(
        "재능 아이디 확인 합니다 =================== ",
        selectedRequest.talentId
      );
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/v1/talent/talentExchange/${selectedRequest.talentId}/approve`,
        {
          guestId: selectedRequest.requesterId,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success("교환 요청이 수락되었습니다.");
        fetchExchangeRequests(); // 목록 새로고침
      }
    } catch (error) {
      console.error("Error approving exchange request:", error);
      toast.error("요청 수락 중 오류가 발생했습니다.");
    }
    handleApproveModalClose();
  };

  const handleWithdraw = async () => {
    const isConfirmed = window.confirm(
      "정말로 탈퇴하시겠습니까? 이 작업은 취소할 수 없습니다."
    );

    if (isConfirmed) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `${process.env.REACT_APP_SERVER}/v1/user/withdraw`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        if (response.status === 200) {
          toast.success("회원 탈퇴가 완료되었습니다.");
          localStorage.removeItem("accessToken");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("회원 탈퇴 중 오류 발생:", error);
        toast.error("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const fetchScrapList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/v1/user/scrap`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      if (response.status === 200) {
        setScrapList(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching scrap list:", error);
      setLoading(false);
    }
  };

  const fetchExchangeRequests = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/v1/talent/talentExchange/info`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      setExchangeRequests(response.data);
    } catch (error) {
      console.error("Error fetching exchange requests:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const profileData = {
        job,
        preferredSubject,
        mySubject,
        gender,
        careerSkills,
      };

      const formData = new FormData();
      formData.append("imgFile", avatar);
      formData.append(
        "profileDto",
        new Blob([JSON.stringify(profileData)], {
          type: "application/json",
        })
      );

      const response = await axios.patch(
        process.env.REACT_APP_SERVER + `/v1/user/profileUpdate`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: accessToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.returnMessage);
      window.location.reload();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handlerFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handlePasswordButtonClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <form className="lg:max-w-[484px]" onSubmit={handleSubmit}>
            <div className="form-group mb-5">
              <label className="form-label" htmlFor="job">
                직업
              </label>
              <input
                className="form-control"
                type="text"
                id="job"
                name="job"
                value={job}
                onChange={handleChange}
                placeholder="직업을 입력해주세요"
              />
            </div>
            <div className="form-group mb-5">
              <label className="form-label" htmlFor="preferredSubject">
                관심 기술
              </label>
              <input
                className="form-control"
                type="text"
                id="preferredSubject"
                name="preferredSubject"
                value={preferredSubject}
                onChange={handleChange}
                placeholder="관심있는 기술을 입력해주세요"
              />
            </div>
            <div className="form-group mb-5">
              <label className="form-label" htmlFor="mySubject">
                보유 기술
              </label>
              <input
                className="form-control"
                type="text"
                id="mySubject"
                name="mySubject"
                value={mySubject}
                onChange={handleChange}
                placeholder="보유하신 기술을 입력해주세요"
              />
            </div>
            <div className="form-group mb-5">
              <label className="form-label" htmlFor="gender">
                성별
              </label>
              <select
                name="gender"
                id="gender"
                className="form-select"
                value={gender}
                onChange={handleChange}
                required
              >
                <option value="">성별을 입력해주세요</option>
                <option value="MALE">남</option>
                <option value="FEMALE">여</option>
              </select>
            </div>
            <div className="form-group mb-5">
              <label className="form-label" htmlFor="careerSkills">
                자기소개
              </label>
              <textarea
                className="form-control h-[150px]"
                id="careerSkills"
                name="careerSkills"
                value={careerSkills}
                onChange={handleChange}
                placeholder="자신의 커리어 소개와 보유하신 기술에 대해서 설명해주세요"
              ></textarea>
            </div>
            <input
              className="btn btn-primary block w-full"
              type="submit"
              value="회원정보 수정"
            />
          </form>
        );
      case "scraps":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse overflow-hidden rounded-lg border-gray-200 bg-white shadow-md">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    스크랩 목록
                  </th>
                </tr>
              </thead>
              <tbody>
                {scrapList.map((scrapItem) => (
                  <tr
                    key={scrapItem.id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      <Link to={`/talent/${scrapItem.id}`}>
                        {scrapItem.title}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "exchangeRequests":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse overflow-hidden rounded-lg border-gray-200 bg-white shadow-md">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    요청자 ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    가르칠 주제
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    배울 주제
                  </th>
                </tr>
              </thead>
              <tbody>
                {exchangeRequests.map((request) => (
                  <tr
                    key={`${request.talentId}-${request.requesterId}`}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRequestClick(request)}
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {request.requesterId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {request.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {request.teachingSubject}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {request.teachedSubject}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-24 rounded-lg bg-white p-8 shadow-lg">
        <div className="relative mb-8">
          <div className="absolute inset-x-0 top-0 mx-auto -mt-24 flex h-32 w-32 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-2xl">
            {avatar && avatar instanceof File ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="Avatar Preview"
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : user && user.imgUrl ? (
              <img
                src={user.imgUrl}
                alt="Avatar Preview"
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="mb-6 flex justify-center space-x-4">
          <button
            className="btn btn-primary transform rounded px-4 py-2 font-medium uppercase shadow transition hover:-translate-y-0.5 hover:shadow-lg"
            onClick={handlePasswordButtonClick}
          >
            비밀번호 수정
          </button>
          <button
            className="btn btn-primary transform rounded px-4 py-2 font-medium uppercase shadow transition hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => fileInputRef.current.click()}
          >
            프로필 이미지 수정
          </button>
          <input
            type="file"
            id="avatar"
            name="avatar"
            style={{ display: "none" }}
            accept=".jpg, .jpeg, .png"
            onChange={handlerFileInputChange}
            ref={fileInputRef}
          />
        </div>

        <div className="mb-6 flex justify-center space-x-4">
          <button
            className={`rounded-md px-4 py-2 font-medium ${
              activeTab === "profile"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            회원정보
          </button>
          <button
            className={`rounded-md px-4 py-2 font-medium ${
              activeTab === "scraps"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("scraps")}
          >
            스크랩 목록
          </button>
          <button
            className={`rounded-md px-4 py-2 font-medium ${
              activeTab === "exchangeRequests"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("exchangeRequests")}
          >
            재능교환 요청
          </button>
        </div>

        <div className="mt-6">{renderTabContent()}</div>

        <div className="mt-8 text-center">
          <button
            className="btn btn-outline-primary text-red-500"
            onClick={handleWithdraw}
          >
            회원 탈퇴
          </button>
        </div>
      </div>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={handlePasswordModalClose}
      />

      {/* {renderTabContent()} */}
      <ApproveModal
        isOpen={showApproveModal}
        onClose={handleApproveModalClose}
        onApprove={handleApproveRequest}
        requesterId={selectedRequest?.requesterId}
      />
    </div>
  );
};

export default UserProfile;
