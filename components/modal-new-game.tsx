import { FC, useState } from "react";
import { formatISO, formatRFC3339 } from "date-fns";
import { TypeOfWin } from "../Types/game";
import ModalTransition from "./modal-transition";
import { useMutation, useQueryClient } from "react-query";
import { hasura } from "../utils/gql";
import gql from "graphql-tag";
import toast from "react-hot-toast";
import { userInfo } from "os";

const Modal: FC<{
  isOpen: boolean;
  users: { first_name: string; last_name: string; id: string }[];
  setIsOpen: (value: boolean) => void;
}> = ({ isOpen, setIsOpen, users }) => {
  const [looser, setLooser] = useState<null | string>(null);

  const [date, setDate] = useState<null | Date>(new Date());

  const [winner, setWinner] = useState<null | string>(null);

  const [winType, setWinType] = useState<TypeOfWin>("🥇");

  const queryClient = useQueryClient();

  const isFormValid = looser && date && winner && winType;

  const newGameMutation = useMutation(
    "ey",
    async (e: any) => {
      e.preventDefault();

      const newGameValues = {
        date: formatRFC3339(date),
        win_type: winType,
        participations: {
          data: [
            {
              participation_type: "winner",
              user_id: winner,
            },
            {
              participation_type: "looser",
              user_id: looser,
            },
          ],
        },
      };

      const response = await hasura(
        gql`
          mutation NewGame(
            $win_type: String!
            $date: timestamptz!
            $participations: participations_arr_rel_insert_input!
          ) {
            insert_games_one(
              object: {
                date: $date
                win_type: $win_type
                participations: $participations
              }
            ) {
              id
            }
          }
        `,
        newGameValues
      );

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("games-history");
        setIsOpen(false);
        toast(
          `Game won by ${
            users.find((user) => user.id === winner)?.first_name
          } and lost by ${
            users.find((user) => user.id === looser)?.first_name
          }`,
          {
            icon: winType === "🥇" ? "🥇 " : "🎱",
          }
        );
      },
    }
  );

  return (
    <ModalTransition isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2 className="text-indigo-600 font-semibold tracking-wide uppercase mb-4">
        Enter your Score
      </h2>
      <form
        className="flex flex-col gap-4 items-center divide-y w-full"
        onSubmit={newGameMutation.mutate}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className=" ">
            <label htmlFor="winner">Winner</label>
            <select
              defaultValue="noone"
              id="winner"
              required
              className="ml-8 w-36"
              onChange={(e: any) => {
                setWinner(e.target.value);
              }}
            >
              <option value={"noone"} disabled>
                Pick winner
              </option>
              {users
                .filter((person) => !(person.id === looser))
                .map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.first_name}. {person.last_name.slice(0, 1)}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="looser">Looser</label>
            <select
              defaultValue="noone"
              id="Looser"
              className="ml-8 w-36"
              onChange={(e: any) => setLooser(e.target.value)}
            >
              <option value={"noone"} disabled>
                Pick looser
              </option>
              {users
                .filter((person) => !(person.id === winner))
                .map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.first_name}. {person.last_name.slice(0, 1)}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="pt-4">
          <label>When did you play?</label>
          <input
            type="date"
            className="ml-1 xl:ml-8"
            defaultValue={formatISO(date || new Date(), {
              representation: "date",
            })}
            required
            onChange={(e) => setDate(e.target.valueAsDate)}
          />
        </div>
        <div className="w-full gap-2 pt-4 flex flex-col justify-between">
          <h2 className="text-center font-medium text-gray-900">
            How did {users.find((user) => user.id === winner)?.first_name} win?
          </h2>

          <div className="gsm:flex space-x-2 sm:items-center gap-2 text-center  mt-2 mb-3 ">
            <input
              id="eight_ball"
              name="type_of_win"
              value="🎱"
              type="radio"
              className="hidden"
              checked={winType === "🎱"}
              onChange={(e) => setWinType(e.target.value as TypeOfWin)}
              required
            />
            <label
              htmlFor="eight_ball"
              className={`p-2 w-auto border border-embie-blue-light-500 rounded ${
                winType === "🎱"
                  ? "bg-embie-blue-light-500 text-white"
                  : "text-embie-blue-light-500"
              }`}
            >
              8ball error
            </label>
            <input
              id="normal_win"
              name="type_of_win"
              value="🥇"
              type="radio"
              checked={winType === "🥇"}
              className="hidden focus:ring-embie-blue-light-600 h-4 w-4 text-embie-blue-light-600 border-embie-blue-light-600"
              onChange={(e) => setWinType(e.target.value as TypeOfWin)}
              required
            />
            <label
              className={`w-auto p-2 border border-embie-blue-light-500 rounded ${
                winType === "🥇"
                  ? "bg-embie-blue-light-500 text-white"
                  : "text-embie-blue-light-500"
              }`}
              htmlFor="normal_win"
            >
              Like a boss
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="flex justify-center!important mt-3 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-embie-blue-light-600 hover:bg-embie-blue-dark-300"
        >
          Submit
        </button>
      </form>
    </ModalTransition>
  );
};
export default Modal;
