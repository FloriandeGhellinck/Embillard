import { hasura } from "../utils/gql";
import gql from "graphql-tag";
import { useMutation, useQuery } from "react-query";
import getUser from "../utils/cookie";
import { formatDate, formatDateWithoutYears } from "../utils/date";
import { GameConfirm } from "../Types/game";
import NewGameModal from "./new-game-modal";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const Welcomeprofile = () => {
  const [mounted, setMounted] = useState(false);

  const user = getUser();
  console.log(user);

  const confirmationQuery = useQuery("confirmationQuery", () =>
    hasura(
      gql`
        query confirmationQuery($id: uuid!) {
          users_by_pk(id: $id) {
            participations(where: { game_confirmed: { _is_null: true } }) {
              game_confirmed
              game_id
              game {
                win_type
                participations {
                  user {
                    first_name
                  }
                  participation_type
                }
                date
              }
            }
          }
        }
      `,
      { id: user.id }
    )
  );

  const gamesNotConfirmedYet =
    confirmationQuery.data?.users_by_pk.participations || [];

  const updateParticipation = useMutation(
    ["setParticipation"],
    async (e: any) =>
      hasura(
        gql`
          mutation updateParticipation(
            $game_id: uuid!
            $user_id: uuid!
            $game_confirmed: String
          ) {
            update_participations_by_pk(
              pk_columns: { game_id: $game_id, user_id: $user_id }
              _set: { game_confirmed: $game_confirmed }
            ) {
              game_confirmed
            }
          }
        `,
        {
          game_id: e.participationID,
          user_id: user.id,
          game_confirmed: e.validatedStatus,
        }
      ),
    {
      onSuccess(data, variables, context) {
        confirmationQuery.refetch();
      },
    }
  );

  const setParticipation = (
    participationID: string,
    validatedStatus: GameConfirm
  ) => {
    console.log(participationID, validatedStatus);
    updateParticipation.mutate({ participationID, validatedStatus });
  };

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="max-w-7xl text-center mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:justify-between min-h-screen">
      <Toaster position="bottom-center" />
      <div className="mb-5 font-extrabold tracking-tight text-gray-900 sm:text-4xl ">
        <h2 className="block text-3xl text-center">
          Welcome on your profile page
        </h2>
        <h2 className=" text-embie-blue-dark-200 text-center text-5xl">
          {user.name}
        </h2>
      </div>
      <div className="mb-4">
        <NewGameModal />
      </div>
      <div className="mx-auto  ">
        {confirmationQuery.isLoading && <h1>Loading</h1>}
        <ul
          role="list"
          // className="grid grid-flow-col auto-cols-max gap-6  "
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6"
        >
          {gamesNotConfirmedYet.map((game) => {
            const winner = game.game.participations.find(
              (e) => e.participation_type === "winner"
            )?.user;
            const looser = game.game.participations.find(
              (e) => e.participation_type === "looser"
            )?.user;

            return (
              <li
                key={game.game_id}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="flex-1 flex flex-col pt-8 pb-3">
                  <h2 className="text-5xl flex-shrink-0 mx-auto rounded-full">
                    {game.game.win_type}
                  </h2>
                  <h2 className="mt-1 text-gray-900 text-3xl font-bold">
                    <span className="text-embie-blue-light-600 ">
                      {winner.first_name}
                    </span>
                  </h2>

                  <h3 className="mt-1 text-gray-900 text-sm font-bold">
                    <span className="">{looser.first_name} </span>
                  </h3>
                </div>

                <div className="flex-1 flex flex-col p-3">
                  <h3 className="mt-1 text-gray-900 text-sm font-medium">
                    Game date:{" "}
                    <span className="font-bold">
                      {formatDate(game.game.date)}{" "}
                    </span>
                  </h3>
                </div>

                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex ">
                      <button
                        onClick={() =>
                          setParticipation(game.game_id, "confirmed")
                        }
                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-600 font-medium border border-transparent rounded-br-lg hover:text-black "
                      >
                        {" "}
                        <span className="bg-green-300 rounded-full md:px-2 md:py-1 px-5 py-2.5">
                          Confirm
                        </span>
                      </button>
                    </div>
                    <div className="w-0 flex-1 flex ">
                      <button
                        onClick={() =>
                          setParticipation(game.game_id, "deleted")
                        }
                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-600 font-medium border border-transparent rounded-br-lg hover:text-black"
                      >
                        {" "}
                        <span className="bg-embie-orange-300 rounded-full md:px-2 md:py-1 px-5 py-2.5">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Welcomeprofile;
