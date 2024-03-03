import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import NoticeDetailComponent from "../components/NoticeDetail/NoticeDetailComponent";


const NoticeDetail = () => {
  return (
    <>
      <Header />
        <NoticeDetailComponent />
      <Footer />

    </>
  );
};

export default NoticeDetail;
