import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GamesTable } from "../../components/games-table";

import Head from "next/head";

const Play = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>Embillard | History </title>
        <meta name="History" content="History" />
      </Head>
      <div className="h-full font-poppins bg-gradient-to-r from-embie-blue-light-300 via-embie-yellow-200 to-embie-orange-200 ">
        <div>
          <Toaster position="bottom-center" />
        </div>
        <div className="flex flex-col items-center justify-center py-3 sm:py-8">
          <div className="justify-center lg:w-8/12 border-rounded-full mx-1">
            <div className="py-3 sm:py-8">
              <div className="mx-auto max-w-md sm:max-w-3xl  lg:max-w-7xl lg:px-8w-8/12 ">
                <GamesTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Play;
