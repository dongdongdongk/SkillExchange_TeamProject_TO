import axios from "axios";
import Lottie from "lottie-react";
import FAIL from "../lottie/FAIL.json";
import SUCCESS from "../lottie/SUCCESS.json"
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ActivationPage = () => {
//   const { activeToken } = useParams();
  const [error, setError] = useState(true);

  useEffect(() => {
    const activeToken = localStorage.getItem("activeToken");
    if (activeToken) {
      // 서버에 activation_token을 전송하여 계정 활성화 요청
      const sendRequest = async () => {
        await axios
          .post(process.env.REACT_APP_SERVER + `/v1/user/activation`, {
            activeToken,
          })
          .then((res) => {
            // 서버 응답 출력
            console.log(res);
            setError(false)
          })
          .catch((err) => {
            // 에러 발생 시 에러 상태 업데이트
            setError(true);
          });
      };
      // sendRequest 함수 호출
      sendRequest();
    }
  }, []);

  return (
    // 화면에 메시지 출력
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <>
          <div className="auth-banner flex flex-col items-center justify-center">
            <div className="w-full text-center">
              <h1>인증에 실패하였습니다!</h1>
              <Lottie
                animationData={FAIL}
                style={{ width: "1000px", height: "1000px" }}
                loop={false}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="auth-banner flex flex-col items-center justify-center">
            <div className="w-full text-center">
              <h1>계정이 활성화되었습니다!</h1>
              <Lottie
                animationData={SUCCESS}
                style={{ width: "1000px", height: "1000px" }}
                loop={false}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivationPage;
