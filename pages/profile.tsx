import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Welcomeprofile from "../components/welcome-profile";
import Head from "next/head";

const Profile = () => {
  const router = useRouter();

  const cookieValue = getCookie("isLoggedIn");

  useEffect(() => {
    if (!cookieValue) {
      router.push("/");
    }
  }, [cookieValue, router]);

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
