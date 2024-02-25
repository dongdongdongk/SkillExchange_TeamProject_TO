import React from "react";
import UserProfileHeader from "../components/UserProfile/UserProfileHeader";
import UserProfileSidebar from "../components/UserProfile/UserProfileSidebar";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";




const UserProfile = () => {
  return (
    <>
        <Header />
        {/* <UserProfileHeader /> */}
        <UserProfileSidebar />
        <Footer />
    </>
  );
};

export default UserProfile;
