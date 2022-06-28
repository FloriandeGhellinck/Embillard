import { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { filter, remove } from "lodash";
import Gamers from "./gamers";

const Modal: FC<{ show: boolean }> = ({ show }) => {
  const [open, setOpen] = useState(show);

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

  const [playerOne, setPlayerOne] = useState(people[0]);

  const [playerTwo, setPlayerTwo] = useState(people[1]);

  const [winner, setWinner] = useState("");
  const [typeOfWin, setTypeOfWin] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <div className="">
                  <div className="">
                    <h2 className="text-indigo-600 font-semibold tracking-wide uppercase">
                      Enter your Score
                    </h2>
                    <form className="mt-2">
                      <div>
                        <label className="m-8">
                          {" "}
                          Player One
                          <select
                            className="ml-8"
                            onChange={(e: any) => {
                              setPlayerOne(e.target.value);
                            }}
                          >
                            {people.map((persons, i) => (
                              <option key={i} value={persons}>
                                {persons}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <div className="mt-2">
                        <label className="mt-2">
                          {" "}
                          Player Two
                          <select
                            className="ml-8"
                            onChange={(e: any) => setPlayerTwo(e.target.value)}
                          >
                            {people
                              .filter((person) => !(person === playerOne))
                              .map((perso, y) => (
                                <option key={y} value={perso}>
                                  {" "}
                                  {/* disabled = value === player 1*/}
                                  {perso}
                                </option>
                              ))}
                          </select>
                        </label>
                      </div>
                      <hr className="m-2"></hr>
                      <label>
                        When did you play?
                        <input type="date" className="ml-2" required />
                      </label>
                      <hr className="m-2"></hr>

                      <div>
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
                            onChange={(e: any) =>
                              //@ts-ignore
                              setWinner(e.target.value)
                            }
                          />
                          <label htmlFor="playerOne">{playerOne}</label>
                          <input
                            name="winner"
                            value={playerTwo}
                            required
                            id="playerTwo"
                            type="radio"
                            className="focus:ring-embie-blue-light-600 h-4 w-4 text-embie-blue-light-600 border-embie-blue-light-600"
                            onChange={(e: any) =>
                              //@ts-ignore
                              setWinner(e.target.value)
                            }
                          />
                          <label htmlFor="playerTwo">{playerTwo}</label>
                        </div>
                      </div>
                      <hr className="m-2"></hr>
                      <div>
                        <h2 className="text-center font-medium text-gray-900">
                          How did {winner} win?
                        </h2>

                        <div className="space-y-4 sm:flex sm:items-center text-center sm:space-y-0 sm:space-x-10 mt-2 mb-3 ">
                          <input
                            name="test"
                            value="eight ball"
                            required
                            type="radio"
                            className="focus:ring-embie-blue-light-600 h-4 w-4 text-embie-blue-light-600 border-embie-blue-light-600"
                            onChange={() => setTypeOfWin(true)}
                          />
                          <label>Eight ball</label>
                          <input
                            name="test"
                            value="normal win"
                            type="radio"
                            className="focus:ring-embie-blue-light-600 h-4 w-4 text-embie-blue-light-600 border-embie-blue-light-600"
                            onChange={() => setTypeOfWin(false)}
                            required
                          />
                          <label>Normal Win</label>
                        </div>
                      </div>

                      <hr className="m-2"></hr>

                      <button
                        type="submit"
                        className="mt-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-embie-blue-light-600 hover:bg-embie-blue-dark-300"
                        //@ts-ignore
                        onClick={console.log(winner)}
                      >
                        Sumbit
                      </button>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal;
