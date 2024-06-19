const KakaoLogin = () => {
    const Rest_api_key = "4dcdd91b2241cb2043887c93438ac2df"; //REST API KEY
    const redirect_uri = process.env.REACT_APP_BASE_URL + "/auth"; //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    const handleLogin = () => {
      window.location.href = kakaoURL;
    };
    return (
        <>
          <div className="row">
            <button
              className="mt-5 btn btn-outline-white block w-full text-dark d-flex align-items-center justify-content-center"
              onClick={handleLogin}
            >
              {/* <img
                src="/images/kakao_login.svg"
                alt="Kakao Login"
                style={{ width: "35px", marginRight: "10px" }}
              /> */}
              Sign In With Kakao
            </button>
          </div>
        </>
      );
  };
  
  export default KakaoLogin;