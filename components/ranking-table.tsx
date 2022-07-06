import { useQuery } from "react-query";
import { hasura } from "../utils/gql";
import gql from "graphql-tag";

const RankingTable = ({ result }) => {
  // const pointsGamesQuery = useQuery("points", () =>
  //   hasura(gql`
  //     query PointGames {
  //       games(order_by: {}) {
  //         id
  //         winner_id
  //       }
  //     }
  //   `)
  // );

  // const pointGames = pointsGamesQuery.data?.games;

  // console.log(pointGames);

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 sm:text-center"
                    >
                      Ranking
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Points
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Games Won 🥇
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Games Won 🎱
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 sm:text-left"
                    >
                      Games Lost 🥇
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                    >
                      Games Lost 🎱
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {result.map((person, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap font-bold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                        {person.ranking}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                        {person.points}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                        {person.gameswonnormal}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                        {person.gameswoneight}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                        {person.gameslostnormal}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                        {person.gameslosteight}
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
  );
};
export default RankingTable;
