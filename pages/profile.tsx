import React from "react";
import Welcomeprofile from "../components/welcome-profile";
import Head from "next/head";

const Profile = () => {
  return (
    <>
      <Head>
        <title>Embillard | Profile </title>
        <meta name="profile" content="profile" />
      </Head>
      <div className="flex text-black bg-gradient-to-r from-embie-orange-200 via-embie-yellow-200 to-embie-blue-light-300">
        <Welcomeprofile />
      </div>
    </>
  );
};

export default Profile;
