import gql from "graphql-tag"
import { FC } from "react"
import { useQuery } from "react-query"
import { formatDate } from "../utils/date"
import { hasura } from "../utils/gql"

const GamesTable: FC = () => {
  const usersGamesQuery = useQuery(
    "games-history",
    () =>
      hasura(gql`
        query UserGames {
          games(order_by: { created_at: desc }, limit: 5) {
            created_at
            looser {
              first_name
            }
            winner {
              first_name
            }
            win_type
          }
        }
      `),
    { refetchOnWindowFocus: true }
  )

  const usersGames = usersGamesQuery.data?.games

  return (
    <div className="relative rounded-2xl px-6 py-10 overflow-hidden shadow-2xl sm:px-12 sm:py-20 bg-gray-100">
      <div className="sm:text-center pb-4">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl underline underline-offset-8 text-gray-800">
          They had fun together
        </h2>
        {/* <h3 className="text-2xl pt-3 tracking-tight">
          Number of played games : {games.length}
        </h3> */}
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
                      className="py-3.5 w-4/12 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                    >
                      <p className="text-xl">Date 🗓 </p>
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 font-bold"
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
                      </svg> */}
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 w-4/12 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      <p className="text-xl">Winner 🤩 </p>
                      {/* <svg
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
                      </svg> */}
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 w-4/12 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      <p className="text-xl">Looser 🙁</p>
                      {/* <svg
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
                      </svg> */}
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 w-4/12 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      <p className="text-xl"> 🏆 </p>
                      {/* <svg
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
                      </svg>{" "} */}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {usersGames &&
                    usersGames.map((game, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                          {formatDate(game.created_at)}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                          {game.winner.first_name}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                          {game.looser.first_name}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-base text-gray-900">
                          {game.win_type}
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
  )
}

export { GamesTable }
