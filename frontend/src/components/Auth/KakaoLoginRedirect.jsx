import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function KakaoLoginRedirect() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (accessToken) {
      const bearerToken = `Bearer ${accessToken}`;
      
      // Save access token in localStorage
      localStorage.setItem("accessToken", bearerToken);

      // Save refresh token in a cookie
      if (refreshToken) {
        setCookie("refreshToken", refreshToken); // Set cookie with 7 days expiry
      }
      
      // Redirect to homepage
      window.location.replace("/");
    }
  }, [location]);

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  }

  return null;
}

export default KakaoLoginRedirect;
