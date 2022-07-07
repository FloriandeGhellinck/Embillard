import React from "react";
import Rules from "../components/rules";
import RankingTable from "../components/ranking-table";

const Ranking = () => {
  return (
    <div className="h-screen font-poppins bg-gradient-to-r from-embie-blue-light-300 via-embie-yellow-200 to-embie-orange-200 ">
      <Rules />
      {/* <RankingTable /> */}
    </div>
  );
};

export default Ranking;
