import React from "react";
import { Header } from "../components/header";
import Navbar from "../components/navbar";

const Tournament = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex h-screen bg-white text-black">
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
          tempore, est, culpa a dolor quasi reiciendis assumenda sunt voluptates
          nisi tenetur quidem ab cupiditate. Distinctio, ratione veritatis. A,
          cum tenetur.
        </p>
      </div>
    </>
  );
};

export default Tournament;
