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
  ];

  const [playerOne, setPlayerOne] = useState(people[0]);

  const [playerTwo, setPlayerTwo] = useState("");

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

        <div className="fixed z-10 inset-0 overflow-y-auto">
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
                    <form
                      className="mt-2"
                      onChange={(e: any) => {
                        setPlayerOne(e.target.value);
                      }}
                    >
                      <label className="m-8">
                        {" "}
                        Player One
                        <select className="ml-8">
                          {people.map((persons, i) => (
                            <option key={i} value={persons}>
                              {persons}
                            </option>
                          ))}
                        </select>
                      </label>
                    </form>

                    <form className="mt-2" onChange={(e) => setPlayerTwo}>
                      <label className="m-8">
                        {" "}
                        Player Two
                        <select className="ml-8">
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
                    </form>
                  </div>
                </div>
                {/* <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Go back to dashboard
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal;
