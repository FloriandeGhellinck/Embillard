import React from "react";
import ReactTypingEffectDemo from "../components/TyppingEffect";

const Home_Page = () => {
  return (
    <div className="bg-gradient-to-r from-embie-orange-200 via-embie-yellow-200 to-embie-blue-light-300">
      <div className="flex flex-col justify-center items-center text-center h-screen">
        <ReactTypingEffectDemo />
      </div>
      <div className="h-screen bg-white">
        <p> </p>
      </div>
    </div>
  );
};

export default Home_Page;
