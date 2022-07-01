import React from "react";
import Rules from "../components/rules";
import RankingTable from "../components/ranking-table";

const results = [
  {
    ranking: "#1",
    name: "Florian",
    points: 17,
    gameswonnormal: 5,
    gameswoneight: 4,
    gameslostnormal: 3,
    gameslosteight: 2,
  },
  {
    ranking: "#2",
    name: "Malo",
    points: 12,
    gameswonnormal: 3,
    gameswoneight: 4,
    gameslostnormal: 3,
    gameslosteight: 1,
  },
  {
    ranking: "#3",
    name: "Bouchra",
    points: 13,
    gameswonnormal: 1,
    gameswoneight: 10,
    gameslostnormal: 3,
    gameslosteight: 2,
  },
  {
    ranking: "#4",
    name: "Nicolas",
    points: -5,
    gameswonnormal: 0,
    gameswoneight: 0,
    gameslostnormal: 0,
    gameslosteight: 5,
  },
  // More people...
];
const Ranking = () => {
  return (
    <div className="h-screen font-poppins bg-gradient-to-r from-embie-blue-light-300 via-embie-yellow-200 to-embie-orange-200 ">
      <Rules />
      <RankingTable result={results} />
    </div>
  );
};

export default Ranking;
