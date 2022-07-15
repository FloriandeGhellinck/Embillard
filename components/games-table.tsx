import gql from "graphql-tag";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { GamerUser } from "../Types/game";
import { formatDate, formatDateWithoutYears } from "../utils/date";
import { hasura } from "../utils/gql";
import NewGameModal from "./new-game-modal";

const GamesTable: FC = () => {
  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      department: "Optimization",
      email: "lindsay.walton@example.com",
      role: "Member",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    // More people...
  ];

  const [limit, setLimit] = useState(5);

  const usersGamesQuery = useQuery(["games-history", limit], () =>
    hasura(
      gql`
        query UserGames($limit: Int!) {
          games(
            limit: $limit
            order_by: { date: desc }
            where: {
              participations: {
                user: {
                  participations: { game_confirmed: { _eq: "confirmed" } }
                }
                game_confirmed: { _eq: "confirmed" }
              }
            }
          ) {
            win_type
            date
            participations {
              participation_type
              user {
                first_name
                last_name
                user_name
              }
            }
            id
          }
        }
      `,
      { limit: limit }
    )
  );

  const usersGames = usersGamesQuery.isLoading
    ? []
    : usersGamesQuery.data?.games;

  console.log("usersGames", usersGames);

  // const arrayFiltered = usersGames.filter(
  //   (participation) =>
  //     participation.participations.game_confirmed === "confirmed"
  // );

  // console.log("arrayfiltered", arrayFiltered);

  // const usersGamesFilteredData = usersGames.map((game) => {
  //   return game.participations.filter(
  //     (participation) => participation.game_confirmed === "confirmed"
  //   );
  // });
  // console.log(usersGamesFilteredData);

  return (
    <div className="rounded-2xl px-6 py-10 overflow-hidden shadow-2xl sm:px-12 sm:py-20 bg-gray-100">
      {/* <h2 className="text-3xl text-center font-extrabold tracking-tight sm:text-4xl  text-gray-900">
        They had fun together
      </h2>
      <div className="sm:text-center "></div>
      <div className="px-4 sm:px-6 lg:px-8 ">
        <div className="mt-8 flex flex-col ">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="font-bold ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 w-4/12 pl-4 pr-3 text-left text-sm font-semibold text-gray-600 sm:pl-6 md:pl-0"
                    >
                      <p className="text-xl sm:text-left hidden sm:contents ">
                        Date 🗓{" "}
                      </p>
                      <p className="text-xl text-left sm:hidden ">🗓 </p>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 w-4/12 px-3 text-left text-sm font-semibold text-gray-600"
                    >
                      <p className="text-xl text-left sm:text-left">
                        <span className="hidden sm:contents"> Winner </span>🤩{" "}
                      </p>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 w-4/12 px-3 text-left text-sm font-semibold text-gray-600"
                    >
                      <p className="text-xl text-left sm:text-left">
                        <span className="hidden sm:contents">Looser </span>🙁{" "}
                      </p>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 w-4/12 px-3 text-left text-sm font-semibold text-gray-600"
                    >
                      <p className="text-xl text-left sm:text-left sm:w-20">
                        <span className="hidden sm:contents">Type </span>🏆{" "}
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 sm:hidden">
                  {usersGames?.map((game) => {
                    // const winner = game.find(
                    //   (e) => e.participation_type === "winner"
                    // ).user;
                    // const looser = game.find(
                    //   (e) => e.participation_type === "looser"
                    // ).user;

                    const participations = game.participations;

                    const winner = participations.find(
                      (e) => e.participation_type === "winner"
                    ).user;
                    const looser = participations.find(
                      (e) => e.participation_type === "looser"
                    ).user;
                    return (
                      <tr key={game.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                          {formatDateWithoutYears(game.date)}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                          {winner.user_name}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                          {looser.user_name}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-base text-gray-900 text-center sm:text-left">
                          {game.win_type}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tbody className="divide-y divide-gray-200 hidden sm:contents">
                  {usersGames?.map((game) => {
                    const participations = game.participations;

                    const winner = participations.find(
                      (e) => e.participation_type === "winner"
                    ).user;
                    const looser = participations.find(
                      (e) => e.participation_type === "looser"
                    ).user;
                    return (
                      <tr key={game.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                          {formatDate(game.date)}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                          <span className="font-bold">
                            {winner.first_name.slice(0, 1)}.
                          </span>{" "}
                          {winner.last_name}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                          <span className="font-semibold">
                            {looser.first_name.slice(0, 1)}.
                          </span>{" "}
                          {looser.last_name}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-base text-gray-900 text-center ">
                          {game.win_type}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <button type="button" onClick={() => setLimit(limit + 5)}>
            Show more
          </button>
        </div>
      </div> */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto mb-5 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <h1 className="block text-3xl text-left">They had fun together</h1>
            <p className="mt-2 text-sm text-gray-700">
              {/* A list of all the users in your account including their name,
              title, email and role. */}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <NewGameModal />
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-400">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 "
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Winner
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Looser
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 bg-white">
                    {usersGames?.map((game) => {
                      const participations = game.participations;

                      const winner = participations.find(
                        (e) => e.participation_type === "winner"
                      ).user;
                      const looser = participations.find(
                        (e) => e.participation_type === "looser"
                      ).user;
                      return (
                        <tr key={game.id}>
                          <td className="hitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-900">
                                {formatDate(game.date)}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                <span className="font-semibold">
                                  {winner.first_name.slice(0, 1)}.
                                </span>{" "}
                                {winner.last_name}
                              </span>
                            </div>
                            {/* <div className="text-gray-500">{"test"}</div> */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="font-semibold">
                              {looser.first_name.slice(0, 1)}.
                            </span>{" "}
                            {looser.last_name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {game.win_type}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button
            className="pt-3"
            type="button"
            onClick={() => setLimit(limit + 5)}
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export { GamesTable };
