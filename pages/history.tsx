import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GamesTable } from "../components/games-table";
import NewGameModal from "../components/new-game-modal";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const Play = () => {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const cookieValue = getCookie("isLoggedIn");

  useEffect(() => {
    if (!cookieValue) {
      router.push("/");
    }
  }, [cookieValue, router]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (!cookieValue) return <>Loading</>;

  return (
    <div className="h-full font-poppins bg-gradient-to-r from-embie-blue-light-300 via-embie-yellow-200 to-embie-orange-200 ">
      <div>
        <Toaster position="bottom-center" />
      </div>
      <div className="flex flex-col items-center justify-center py-3 sm:py-8">
        {/* <NewGameModal /> */}
        <div className="justify-center w-11/12 border-rounded-full">
          <div className="py-3 sm:py-8">
            <div className="mx-auto max-w-md sm:max-w-3xl  lg:max-w-7xl lg:px-8w-8/12 ">
              <GamesTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
