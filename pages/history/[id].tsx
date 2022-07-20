import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { hasura } from "../../utils/gql";
import gql from "graphql-tag";
import Head from "next/head";
import { formatDate, formatDateWithHours } from "../../utils/date";
import Link from "next/link";

const HistoricByID = () => {
  const router = useRouter();
  const { id } = router.query;

  const [limit, setLimit] = useState(5);

  const usersGamesQuery = useQuery(
    ["games-history", id, limit],
    () =>
      hasura(
        gql`
          query UserGames($limit: Int!, $id: uuid) {
            games(
              limit: $limit
              order_by: { date: desc }
              where: {
                participations: {
                  user: {
                    participations: { game_confirmed: { _eq: "confirmed" } }
                    id: { _eq: $id }
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
                  id
                }
              }
              id
            }
          }
        `,
        { limit, id }
      ),
    { enabled: !!id }
  );

  const usersGames = usersGamesQuery.isLoading
    ? []
    : usersGamesQuery.data?.games;

  //   useEffect(() => {
  //     usersGamesQuery?.refetch();
  //   }, [id]);

  return (
    <>
      <Head>
        <title>Embillard | History </title>
        <meta name="History" content="History" />
      </Head>
      <div className="h-full font-poppins bg-gradient-to-r from-embie-blue-light-300 via-embie-yellow-200 to-embie-orange-200 ">
        <div className="flex flex-col items-center justify-center py-3 sm:py-8">
          <div className="justify-center lg:w-8/12 border-rounded-full mx-1">
            <div className="py-3 sm:py-8">
              <div className="mx-auto max-w-md sm:max-w-3xl  lg:max-w-7xl lg:px-8w-8/12 ">
                <div className="rounded-2xl px-6 py-10 overflow-hidden shadow-2xl sm:px-12 sm:py-20 bg-gray-100">
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-center text-center items-center align-middle">
                      <div className=" font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <h1 className=" text-3xl text-center sm:text-left">
                          They had fun together
                        </h1>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-16">
                        {/* <NewGameModal /> */}
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 "
                                  >
                                    <p className="text-xl sm:text-left hidden sm:contents ">
                                      Date 🗓{" "}
                                    </p>
                                    <p className="text-xl text-left ml-4 sm:hidden ">
                                      🗓{" "}
                                    </p>
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                  >
                                    <p className="text-xl text-left sm:text-left">
                                      <span className="hidden sm:contents">
                                        {" "}
                                        Winner{" "}
                                      </span>
                                      🤩{" "}
                                    </p>
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                  >
                                    <p className="text-xl text-left sm:text-left">
                                      <span className="hidden sm:contents">
                                        Looser{" "}
                                      </span>
                                      🙁{" "}
                                    </p>
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                  >
                                    <p className="text-xl text-left sm:text-left sm:w-20">
                                      <span className="hidden sm:contents">
                                        Type{" "}
                                      </span>
                                      🏆{" "}
                                    </p>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
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
                                            <span className="hidden sm:contents">
                                              {formatDateWithHours(game.date)}{" "}
                                            </span>{" "}
                                            <span className="sm:hidden">
                                              {formatDate(game.date)}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div className="text-gray-900">
                                          <Link href={`/history/${winner.id}`}>
                                            <a className="hover:underline inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                              <span className="hidden sm:contents">
                                                {winner.first_name}{" "}
                                                {winner.last_name}
                                              </span>
                                              <span className="sm:hidden">
                                                {winner.user_name}{" "}
                                              </span>
                                            </a>
                                          </Link>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <Link href={`/history/${looser.id}`}>
                                          <a className="hover:underline">
                                            <span className="hidden sm:contents">
                                              {looser.first_name}{" "}
                                              {looser.last_name}
                                            </span>
                                            <span className="sm:hidden">
                                              {looser.user_name}
                                            </span>
                                          </a>
                                        </Link>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoricByID;
