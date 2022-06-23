import React from "react";
import ReactTypingEffectDemo from "../components/TyppingEffect";

const Home_Page = () => {
  return (
    <div className="bg-gradient-to-br from-embie-orange-200 via-embie-yellow-200 to-embie-blue-light-300">
      <div className="flex flex-col justify-center items-center text-center h-screen">
        {" "}
        <ReactTypingEffectDemo />
      </div>
      <div className="h-screen bg-black text-white">
        <p>
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
          asperiores minima illo consectetur rem, ducimus tempore! Hic qui, fuga
          sequi magnam tempore rerum odit, voluptatem incidunt quos mollitia
          repudiandae! Deserunt!
        </p>
      </div>
    </div>
  );
};

export default Home_Page;
