import React from "react";
import ReactTypingEffectDemo from "../components/TyppingEffect";
import Image from "next/image";

const Home_Page = () => {
  return (
    <div className="bg-gradient-to-r from-embie-orange-200 via-embie-yellow-200 to-embie-blue-light-300 h-screen">
      {/* <div className="flex flex-col justify-center items-center text-center h-screen">
        <ReactTypingEffectDemo />
      </div> */}
      <div className="h-screen flex ">
        <div className="flex items-center text-center justify-center md:w-6/12 w-full ">
          <ReactTypingEffectDemo />
        </div>
        <div className="hidden md:contents">
          <div className="relative w-3/12 my-20 ml-32 items-center justify-center   ">
            <Image
              src="/claudio-schwarz-ymzHjhuxvt8-unsplash.jpg"
              alt="caroussel"
              layout="fill"
              objectFit="cover"
              // height="fix-content"
              // width="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_Page;
