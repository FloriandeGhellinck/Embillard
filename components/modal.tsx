import { FC, Fragment, PropsWithChildren, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { formatISO } from "date-fns";
import { TypeOfWin } from "../Types/game";

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

  const [looser, setLooser] = useState<null | string>(null);

  const [date, setDate] = useState<null | Date>(new Date());

  const [winner, setWinner] = useState<null | string>(null);

  const [typeOfWin, setTypeOfWin] = useState<TypeOfWin>("normal_win");

  const isFormValid = looser && date && winner && typeOfWin;

  return (
    <ModalTransition isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2 className="text-indigo-600 font-semibold tracking-wide uppercase mb-4">
        Enter your Score
      </h2>
      <form
        className="flex flex-col gap-4 items-center divide-y w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (isFormValid) {
            handleNewGame({ looser, date, winner, typeOfWin });
            setIsOpen(false);
          }
        }}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className=" ">
            <label htmlFor="winner">Winner</label>
            <select
              defaultValue="noone"
              id="winner"
              required
              className="ml-8 w-36"
              onChange={(e: any) => {
                setWinner(e.target.value);
              }}
            >
              <option value={"noone"} disabled>
                Pick winner
              </option>
              {people
                .filter((person) => !(person === looser))
                .map((person, i) => (
                  <option key={i} value={person}>
                    {person}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="looser">Looser</label>
            <select
              defaultValue="noone"
              id="Looser"
              className="ml-8 w-36"
              onChange={(e: any) => setLooser(e.target.value)}
            >
              <option value={"noone"} disabled>
                Pick looser
              </option>
              {people
                .filter((person) => !(person === winner))
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
            className="ml-1 xl:ml-8"
            defaultValue={formatISO(date || new Date(), {
              representation: "date",
            })}
            required
            onChange={(e) => setDate(e.target.valueAsDate)}
          />
        </div>
        {/* {playerOne && playerTwo && ( */}

        {/* )} */}
        <div className="w-full pt-4 flex flex-col justify-between">
          <h2 className="text-center font-medium text-gray-900">
            How did {winner} win?
          </h2>

          <div className=" sm:flex sm:items-center md:gap-2 sm:gap-2 text-center sm:space-y-0 sm:space-x-10 mt-2 mb-3 ">
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
              className={`p-2 w-auto border border-embie-blue-light-500 rounded ${
                typeOfWin === "eight_ball"
                  ? "bg-embie-blue-light-500 text-white"
                  : "text-embie-blue-light-500"
              }`}
            >
              8ball error
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
              className={`w-auto p-2 border border-embie-blue-light-500 rounded ${
                typeOfWin === "normal_win"
                  ? "bg-embie-blue-light-500 text-white"
                  : "text-embie-blue-light-500"
              }`}
              htmlFor="normal_win"
            >
              Like a boss
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="flex justify-center!important mt-3 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-embie-blue-light-600 hover:bg-embie-blue-dark-300"
        >
          Submit
        </button>
      </form>
    </ModalTransition>
  );
};
export default Modal;
