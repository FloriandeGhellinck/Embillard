import React from "react";
import ReactTypingEffectDemo from "../components/typping-effect";
import Image from "next/image";
import Signin from "../components/sign-in-button";
import Signout from "../components/sign-out-button";
import Head from "next/head";

const Home_Page = () => {
  return (
    <>
      <Head>
        <title>Embillard | Home </title>
        <meta name="homePage" content="Homepage" />
      </Head>

      <div className="bg-gradient-to-r from-embie-orange-200 via-embie-yellow-200 to-embie-blue-light-300 h-screen">
        <div className="h-screen flex ">
          <div className="flex flex-col items-center text-center justify-center md:w-6/12 w-full ">
            <ReactTypingEffectDemo />
            <div className="space-x-3">
              <Signout />
            </div>
          </div>
          <div className="hidden md:contents">
            <div className="relative w-3/12 my-20 ml-32 items-center justify-center   ">
              <Image
                src="/claudio-schwarz-ymzHjhuxvt8-unsplash.jpg"
                alt="caroussel"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home_Page;
