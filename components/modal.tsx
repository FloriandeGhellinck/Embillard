import {
  FC,
  FormEventHandler,
  Fragment,
  PropsWithChildren,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { formatISO } from "date-fns";

const ModalTransition: FC<
  PropsWithChildren<{
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  }>
> = ({ isOpen, setIsOpen, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto font-poppins">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

type TypeOfWin = "eight_ball" | "normal_win" | null;

const Modal: FC<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleNewGame: (e: any) => void;
}> = ({ isOpen, handleNewGame, setIsOpen }) => {
  const people = [
    "Malo",
    "Base",
    "Thib",
    "Bouchra",
    "Yann",
    "Dams",
    "Gauthier",
    "Florian",
  ];

  const [playerOne, setPlayerOne] = useState<null | string>(null);

  const [playerTwo, setPlayerTwo] = useState<null | string>(null);

  const [date, setDate] = useState<null | Date>(new Date());

  const [winner, setWinner] = useState<null | string>(null);

  const [typeOfWin, setTypeOfWin] = useState<TypeOfWin>("normal_win");

  const isFormValid = playerOne && playerTwo && date && winner && typeOfWin;

  return (
    <ModalTransition isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2 className="text-indigo-600 font-semibold tracking-wide uppercase">
        Enter your Score
      </h2>
      <form
        className="flex flex-col gap-4 items-start divide-y w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (isFormValid) {
            handleNewGame({ playerOne, playerTwo, date, winner, typeOfWin });
            setIsOpen(false);
          }
        }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="player_1">Player One</label>
            <select
              defaultValue="noone"
              id="player_1"
              required
              className="ml-8"
              onChange={(e: any) => {
                setPlayerOne(e.target.value);
              }}
            >
              <option value={"noone"} disabled>
                Pick a player
              </option>
              {people.map((person, i) => (
                <option key={i} value={person}>
                  {person}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="player_2">Player Two</label>
            <select
              defaultValue="noone"
              id="player_2"
              className="ml-8"
              onChange={(e: any) => setPlayerTwo(e.target.value)}
            >
              <option value={"noone"} disabled>
                Pick a player
              </option>
              {people
                .filter((person) => !(person === playerOne))
                .map((person, y) => (
                  <option key={y} value={person}>
                    {person}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="pt-4">
          <label>When did you play?</label>
          <input
            type="date"
            className="ml-8"
            defaultValue={formatISO(date || new Date(), {
              representation: "date",
            })}
            required
            onChange={(e) => setDate(e.target.valueAsDate)}
          />
        </div>
        {playerOne && playerTwo && (
          <div className="w-full pt-4">
            <label className="text-center text-gray-900 ">
              Who&apos;s the winner?
            </label>
            <div className="space-y-4 sm:flex sm:items-center text-center sm:space-y-0 sm:space-x-10 mt-2 mb-3">
              <input
                name="winner"
                id="playerOne"
                value={playerOne}
                required
                type="radio"
                className="focus:ring-embie-blue-light-600 h-4 w-4 text-embie-blue-light-600 border-embie-blue-light-600"
                onChange={(e) => setWinner(e.target.value)}
              />
              <label htmlFor="playerOne">{playerOne}</label>
              <input
                name="winner"
                value={playerTwo}
                required
                id="playerTwo"
                type="radio"
                className="focus:ring-embie-blue-light-600 h-4 w-4 text-embie-blue-light-600 border-embie-blue-light-600"
                onChange={(e) => setWinner(e.target.value)}
              />
              <label htmlFor="playerTwo">{playerTwo}</label>
            </div>
          </div>
        )}
        <div className="w-full pt-4">
          <h2 className="text-center font-medium text-gray-900">
            How did {winner} win?
          </h2>

          <div className="space-y-4 sm:flex sm:items-center text-center sm:space-y-0 sm:space-x-10 mt-2 mb-3 ">
            <input
              id="eight_ball"
              name="type_of_win"
              value="eight_ball"
              type="radio"
              className="hidden"
              checked={typeOfWin === "eight_ball"}
              onChange={(e) => setTypeOfWin(e.target.value as TypeOfWin)}
              required
            />
            <label
              htmlFor="eight_ball"
              className={`px-4 py-2 border border-blue-500 rounded ${
                typeOfWin === "eight_ball"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              }`}
            >
              Eight ball
            </label>
            <input
              id="normal_win"
              name="type_of_win"
              value="normal_win"
              type="radio"
              checked={typeOfWin === "normal_win"}
              className="hidden focus:ring-embie-blue-light-600 h-4 w-4 text-embie-blue-light-600 border-embie-blue-light-600"
              onChange={(e) => setTypeOfWin(e.target.value as TypeOfWin)}
              required
            />
            <label
              className={`px-4 py-2 border border-blue-500 rounded ${
                typeOfWin === "normal_win"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              }`}
              htmlFor="normal_win"
            >
              Normal Win
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className="mt-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-embie-blue-light-600 hover:bg-embie-blue-dark-300"
        >
          Submit
        </button>
      </form>
    </ModalTransition>
  );
};
export default Modal;
