import { useQuery } from "react-query";
import { hasura } from "../utils/gql";
import gql from "graphql-tag";
import { TypeOfWin } from "../Types/game";

const RankingTable = () => {
  const gamesFromDatabase = useQuery("games-history-for-each-user", () =>
    hasura(
      gql`
        query GamesFromDatabase {
          users {
            first_name
            last_name
            user_name
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

  //const dataAboutGames = gamesFromDatabase.data?.users
  const dataAboutGames: {
    first_name: string;
    last_name: string;
    user_name: string;
    id: string;
    participations: {
      participation_type: "winner" | "looser";
      game: {
        win_type: TypeOfWin;
      };
    }[];
  }[] = gamesFromDatabase.isLoading ? [] : gamesFromDatabase.data.users;

  const getPointsFromUser = (person) => {
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

    return {
      points,
      getNumberOfLostGamesByBlackBall,
      getNumberOfLostGamesByMedal,
      getNumberOfWinByBlackBall,
      getNumberOfWinGamesByMedal,
    };
  };

  let dataComputed = dataAboutGames.map((person) => {
    return { ...person, resume: getPointsFromUser(person) };
  });

  const dataSortedByPoints = dataComputed.sort((personA, personB) => {
    const pointsA = personA.resume.points;
    const pointsB = personB.resume.points;

    return pointsB - pointsA;
  });

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 flex justify-center overflow-scroll">
      {/* <div className="sm:flex sm:items-center"></div> */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8 ml-1 pr-1">
          <div className=" min-w-full py-2 align-middle md:px-6 lg:px-8 ">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg ">
              <table className="min-w-full divide-y divide-gray-300 ">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 sm:text-center"
                    >
                      <span className="hidden sm:contents ">Ranking</span>{" "}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 "
                    >
                      Points
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      {" "}
                      <span className="hidden sm:contents">
                        Games Won{" "}
                      </span>{" "}
                      <span className="sm:hidden">Win</span>🥇
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      {" "}
                      <span className="hidden sm:contents">
                        Games Won{" "}
                      </span>{" "}
                      <span className="sm:hidden">Win</span> 🎱
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 sm:text-left"
                    >
                      {" "}
                      <span className="hidden sm:contents"> Games Lost</span>
                      <span className="sm:hidden"> Lost</span> 🥇
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 "
                    >
                      <span className="hidden sm:contents"> Games Lost</span>
                      <span className="sm:hidden"> Lost</span> 🎱
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {dataSortedByPoints.map((person, i) => {
                    return (
                      <tr key={i}>
                        <td className="whitespace-nowrap font-bold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                          #{i + 1}
                        </td>
                        <div className="hidden sm:contents">
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                            <span className="font-bold">
                              {person.first_name.slice(0, 1)}.{" "}
                            </span>
                            {person.last_name}
                          </td>
                        </div>
                        <div className="sm:hidden">
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                            {person.user_name}
                          </td>
                        </div>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {person.resume.points}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {person.resume.getNumberOfWinGamesByMedal}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {person.resume.getNumberOfWinByBlackBall}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {person.resume.getNumberOfLostGamesByMedal}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                          {person.resume.getNumberOfLostGamesByBlackBall}
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
