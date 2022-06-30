import { FC, useState } from "react";
import { TypeOfWin } from "../Types/game";
import Modal from "./modal";

const NewGameModal: FC<{
  handleNewGame: (e: {
    looser: string;
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
        className=" inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-embie-blue-light-600 hover:bg-embie-blue-dark-300"
        onClick={handleToggleModal}
      >
        Enter a score
      </button>
    </>
  );
};

export default NewGameModal;
