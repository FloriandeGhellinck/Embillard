import React, { FC, useState } from "react";
import Modal from "../components/modal";
import { GamesTable } from "../components/games-table";
import { format } from "date-fns";
import { TypeOfWin } from "../Types/game";

const DEFAULT_GAMES = [
  {
    date: "24/06/2022",
    winner: "Florian",
    looser: "Gauthier",
    typeOfWin: "Yes",
  },
  {
    date: "24/06/2022",
    winner: "Malo",
    looser: "Base",
    typeOfWin: "No",
  },
];

const NewGameModal: FC<{
  handleNewGame: (e: {
    playerOne: string;
    playerTwo: string;
    date: Date;
    winner: string;
    typeOfWin: TypeOfWin;
  }) => void;
}> = ({ handleNewGame }) => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <Modal
          isOpen={showModal}
          setIsOpen={setShowModal}
          handleNewGame={handleNewGame}
        />
      )}
      <button
        type="button"
        className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-embie-blue-light-600 hover:bg-embie-blue-dark-300"
        onClick={handleToggleModal}
      >
        Enter a score
      </button>
    </>
  );
};

const Play = () => {
  const [games, setGames] = useState(DEFAULT_GAMES);

  const handleNewGame: (values: any) => void = (values) => {
    setGames((prevState) => [
      ...prevState,
      {
        date: format(values.date, "dd/MM/yyyy"),
        winner: values.winner,
        looser: values.looser,
        typeOfWin: values.typeOfWin,
      },
    ]);
  };

  return (
    <div className="h-screen font-poppins bg-gradient-to-r from-embie-orange-200 via-embie-yellow-200 to-embie-blue-light-300 ">
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
