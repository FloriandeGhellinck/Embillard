import { useQuery } from "react-query";
import { hasura } from "../utils/gql";
import gql from "graphql-tag";

const RankingTable = () => {
  const gamesFromDatabase = useQuery("games-history-for-each-user", () =>
    hasura(
      gql`
        query GamesFromDatabase {
          users {
            first_name
            last_name
            id
            participations(limit: 10, order_by: { game: { date: desc } }) {
              participation_type
              game {
                win_type
              }
            }
          }
        }
      `
    )
  );

  const dataAboutGames = gamesFromDatabase.data?.users;

  const getPointsFromUser = (person) => {
    console.log({ person });

    const participations = person.participations;

    const winGamesByMedal = participations.filter(
      (participation) =>
        participation.participation_type === "winner" &&
        participation.game.win_type === "🥇"
    );
    const getNumberOfWinGamesByMedal = winGamesByMedal.length;

    const winGamesByBlackBall = participations.filter(
      (participation) =>
        participation.game.win_type === "🎱" &&
        participation.participation_type === "winner"
    );
    const getNumberOfWinByBlackBall = winGamesByBlackBall.length;

    const lostGamesByMedal = participations.filter(
      (participations) =>
        participations.participation_type === "looser" &&
        participations.game.win_type === "🥇"
    );

    const getNumberOfLostGamesByMedal = lostGamesByMedal.length;

    const lostGamesByBlackBall = participations.filter(
      (participations) =>
        participations.participation_type === "looser" &&
        participations.game.win_type === "🎱"
    );

    const getNumberOfLostGamesByBlackBall = lostGamesByBlackBall.length;

    const points =
      getNumberOfWinGamesByMedal * 3 +
      getNumberOfWinByBlackBall -
      getNumberOfLostGamesByBlackBall;

    return points;
  };

  const sortedDataAboutGames = dataAboutGames?.sort((personA, personB) => {
    const pointsA = getPointsFromUser(personA);
    const pointsB = getPointsFromUser(personB);
    console.log({ pointsA, pointsB });

    return pointsB - pointsA;
  });

  // NOW : 1. CALC + SORT 2. CALC + RENDER

  // TODO : 1. CALC 2. SORT 3. RENDER

  // // console.log(dataAboutGames);

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
                  {sortedDataAboutGames?.map((person, i) => {
                    const participations = person.participations;

                    const winGamesByMedal = participations.filter(
                      (participation) =>
                        participation.participation_type === "winner" &&
                        participation.game.win_type === "🥇"
                    );
                    const getNumberOfWinGamesByMedal = winGamesByMedal.length;

                    const winGamesByBlackBall = participations.filter(
                      (participation) =>
                        participation.game.win_type === "🎱" &&
                        participation.participation_type === "winner"
                    );
                    const getNumberOfWinByBlackBall =
                      winGamesByBlackBall.length;

                    const lostGamesByMedal = participations.filter(
                      (participations) =>
                        participations.participation_type === "looser" &&
                        participations.game.win_type === "🥇"
                    );

                    const getNumberOfLostGamesByMedal = lostGamesByMedal.length;

                    const lostGamesByBlackBall = participations.filter(
                      (participations) =>
                        participations.participation_type === "looser" &&
                        participations.game.win_type === "🎱"
                    );

                    const getNumberOfLostGamesByBlackBall =
                      lostGamesByBlackBall.length;

                    const points =
                      getNumberOfWinGamesByMedal * 3 +
                      getNumberOfWinByBlackBall -
                      getNumberOfLostGamesByBlackBall;

                    return (
                      <tr key={i}>
                        <td className="whitespace-nowrap font-bold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                          #{i + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="font-bold">
                            {person.first_name.slice(0, 1)}.{" "}
                          </span>
                          {person.last_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {points}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {getNumberOfWinGamesByMedal}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {getNumberOfWinByBlackBall}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {getNumberOfLostGamesByMedal}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {getNumberOfLostGamesByBlackBall}
                        </td>
                      </tr>
                    );
                  })}
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
