import React from "react";
import { Header } from "../components/header";
import Navbar from "../components/navbar";
import { useState } from "react";

const games = [
  {
    date: "24/06/2022",
    winner: "Florian",
    looser: "Gauthier",
    black: "Yes",
  },
  {
    date: "24/06/2022",
    winner: "Malo",
    looser: "Base",
    black: "No",
  },
  // More people...
];

const Play = () => {
  const [showform, setShowform] = useState(false);

  const showForm = () => {
    setShowform(!showform);
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="h-screen font-poppins bg-gradient-to-r from-embie-orange-200 via-embie-yellow-200 to-embie-blue-light-300 ">
        <div className="flex flex-col items-center justify-center pt-28">
          <div className="flex mt-14 justify-center w-8/12  border-rounded-full">
            <button
              type="button"
              onClick={showForm}
              className="mt-14 mb-14 relative block border-2 border-gray-800 rounded-lg p-12 text-center hover:border-gray-400"
            >
              <div className="flex flex-col justify-center items-center">
                <img
                  className="w-14 h-14 "
                  src="../billiard.png"
                  alt="billard"
                />

                <span className="mt-2 block text-lg font-medium text-gray-900">
                  Enter a new result
                </span>
              </div>
            </button>
          </div>

          <div className="justify-center w-8/12 border-rounded-full">
            <div className="">
              <div className="relative sm:py-16">
                <div className="mx-auto max-w-md sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8w-8/12">
                  <div className="relative rounded-2xl px-6 py-10 bg-white overflow-hidden shadow-xl sm:px-12 sm:py-20">
                    <div className="relative">
                      <div className="sm:text-center pb-4">
                        <h2 className="text-3xl font-extrabold text-black tracking-tight sm:text-4xl">
                          They had fun together
                        </h2>
                      </div>
                    </div>
                    <div className="px-4 sm:px-6 lg:px-8 ">
                      <div className="mt-8 flex flex-col ">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8  bg-white">
                            <table className="min-w-full divide-y divide-gray-300">
                              <thead className="">
                                <tr>
                                  <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </th>
                                  <th
                                    scope="col"
                                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </th>
                                  <th
                                    scope="col"
                                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </th>
                                  <th
                                    scope="col"
                                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                      />
                                    </svg>{" "}
                                  </th>
                                  <th
                                    scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                                  >
                                    <span className="sr-only">Edit</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {games.map((games) => (
                                  <tr key={games.looser}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                                      {games.date}
                                    </td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                                      {games.winner}
                                    </td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                                      {games.looser}
                                    </td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                                      {games.black}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Play;
