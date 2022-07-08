import gql from "graphql-tag";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { formatDate, formatDateWithoutYears } from "../utils/date";
import { hasura } from "../utils/gql";

const GamesTable: FC = () => {
  const [limit, setLimit] = useState(5);

  const usersGamesQuery = useQuery(["games-history", limit], () =>
    hasura(
      gql`
        query UserGames($limit: Int!) {
          games(limit: $limit, order_by: { date: desc }) {
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

  const usersGames = usersGamesQuery.data?.games;

  return (
    <div className="rounded-2xl px-6 py-10 overflow-hidden shadow-2xl sm:px-12 sm:py-20 bg-gray-100">
      <div className="sm:text-center ">
        <h2 className="text-3xl text-center font-extrabold tracking-tight sm:text-4xl sm:underline underline-offset-8 text-gray-400 sm:text-gray-600">
          They had fun together
        </h2>
      </div>
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
                        <td className="whitespace-nowrap py-4 px-3 text-base text-gray-900 text-center sm:text-left">
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
      </div>
    </div>
  );
};

export { GamesTable };
