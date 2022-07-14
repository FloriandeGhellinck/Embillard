import React, { useEffect, useState } from "react";
import Rules from "../components/rules";
import RankingTable from "../components/ranking-table";

const Ranking = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen font-poppins bg-gradient-to-r from-embie-blue-light-300 via-embie-yellow-200 to-embie-orange-200 ">
      <Rules />
      <RankingTable />
    </div>
  );
};

export default Ranking;
