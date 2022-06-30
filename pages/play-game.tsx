import React, { useState } from "react";
import { GamesTable } from "../components/games-table";
import { format } from "date-fns";
import { GameList } from "../Types/game";
import NewGameModal from "../components/newGameModal";

const DEFAULT_GAMES: GameList = [
  {
    date: "24/06/2022",
    winner: "Florian",
    looser: "Gauthier",
    typeOfWin: "🎱",
  },
  {
    date: "24/06/2022",
    winner: "Malo",
    looser: "Base",
    typeOfWin: "🥇",
  },
];

const Play = () => {
  const [games, setGames] = useState<GameList>(DEFAULT_GAMES);

  const handleNewGame = ({ date, winner, looser, typeOfWin }) => {
    let newGames: GameList = [];

    for (let i = 0; i < games.length; i++) {
      newGames.push(games[i]);
    }

    newGames.push({
      date: format(date, "dd/MM/yyyy"),
      winner: winner,
      looser: looser,
      typeOfWin: typeOfWin,
    });

    setGames(newGames);
  };

  return (
    <div className="h-screen font-poppins bg-gradient-to-r from-embie-blue-light-300 via-embie-yellow-200 to-embie-orange-200 ">
      <div className="flex flex-col items-center justify-center pt-28">
        <NewGameModal handleNewGame={handleNewGame} />
        <div className="justify-center w-8/12 border-rounded-full">
          <div className="relative sm:py-16">
            <div className="mx-auto max-w-md sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8w-8/12">
              <GamesTable games={games} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
