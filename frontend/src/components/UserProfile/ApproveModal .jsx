import React from 'react';

const ApproveModal = ({ isOpen, onClose, onApprove, requesterId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">교환 요청 수락</h2>
        <p>{requesterId}님의 요청을 수락하시겠습니까?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 rounded mr-2"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onApprove}
          >
            수락
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;