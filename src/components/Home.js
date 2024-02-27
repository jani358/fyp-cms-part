import React from "react";
import cmsImage from "../images/cms.jpg"; 

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8">Welcome to our CMS system</h2>
      <div className="max-w-md bg-white shadow-md rounded-md overflow-hidden md:flex md:items-center md:p-6">
        <img src={cmsImage} alt="" className="md:w-1/3" />
        <p className="md:w-2/3 md:ml-6 md:mt-0 mt-4 text-gray-700">
          This is our content management system for our Flutter mobile
          application.
        </p>
      </div>
    </div>
  );
};

export default Home;
