import React from "react";
import { GamesTable } from "../components/games-table";
import NewGameModal from "../components/newGameModal";

const Play = () => {
  return (
    <div className="h-full font-poppins bg-gradient-to-r from-embie-blue-light-300 via-embie-yellow-200 to-embie-orange-200 ">
      <div className="flex flex-col items-center justify-center pt-3 sm:pt-8">
        <NewGameModal />
        <div className="justify-center w-11/12 border-rounded-full mt-4">
          <div className="sm:py-16">
            <div className="mx-auto max-w-md sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8w-8/12 ">
              <GamesTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
