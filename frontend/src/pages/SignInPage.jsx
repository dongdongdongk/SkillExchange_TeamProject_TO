
import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import SignInForm from "../components/SignIn/SignInForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated} = useSelector((state) => state.user);

  useEffect(() => {
      if(isAuthenticated === true) {
          navigate("/")
      }
  })
  return (
    <>
      <Header />
 
          <SignInForm />
          

      <Footer />
      
    </>
  );
};

export default SignInPage;
