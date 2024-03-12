import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const PasswordModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        toast("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
        const accessToken = localStorage.getItem('accessToken');
    
        const requestData = {
          password: oldPassword,
          newPassword: newPassword,
          newPasswordCheck: confirmPassword,
        };
    
        const response = await axios.put(
          `${process.env.REACT_APP_SERVER}/v1/user/updatePw`,
          requestData,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
    
        console.log(response.data); // 응답 데이터 확인용
        toast.success(response.data.returnMessage);
    
        // 모달 창 닫기
        onClose();
      } catch (err) {
        toast.error('비밀번호 변경 중 오류 발생:', err.response.data.message);
        // alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');

      }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative mx-auto max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">비밀번호 변경</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="mb-2 block">
              현재 비밀번호
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full  rounded-[5px] px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="mb-2 block">
              새 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full  rounded-[5px] px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="mb-2 block">
              새 비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full  rounded-[5px] px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn-primary mr-2 rounded bg-gray-300 px-4 py-2 font-bold text-white hover:bg-gray-400"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className="btn-primary rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
