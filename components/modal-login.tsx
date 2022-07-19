import ModalTransition from "./modal-transition";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { hasura } from "../utils/gql";
import gql from "graphql-tag";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Wrongpassword from "./wrong-password";

const Modalsignin: FC<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}> = ({ setIsOpen, isOpen }) => {
  const [isShown, setIsShown] = useState(false);

  const router = useRouter();

  const [player, setPlayer] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showWrongPassword, setShowWrongPassword] = useState<boolean>(false);

  const isFormValid = player && password;

  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  const usersQuery = useQuery("usersforlogin", () =>
    hasura(gql`
      query GetUsers {
        users {
          first_name
          last_name
          id
        }
      }
    `)
  );

  const users = usersQuery.data?.users;

  const checkLogin = async (e) => {
    e.preventDefault();

    const userToLogin = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player,
        password,
      }),
    });

    if (!userToLogin) {
      setShowWrongPassword(true);
    } else {
      router.push("/profile");
    }
  };

  return (
    <>
      <ModalTransition isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-indigo-600 font-semibold tracking-wide uppercase mb-4">
          Login Page
        </h2>
        {usersQuery.isLoading || !users ? (
          "Loading..."
        ) : (
          <form onSubmit={checkLogin}>
            <div className="text-left space-x-20 mb-5 flex items-center">
              <label htmlFor="player" className="w-10">
                Player
              </label>
              <select
                defaultValue="noone"
                id="player"
                className="ml-8 w-36"
                onChange={(e) => setPlayer(e.target.value)}
                // value={player}
              >
                <option value={"noone"} disabled>
                  Pick Player
                </option>
                {users?.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.first_name}. {person.last_name.slice(0, 1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-left space-x-20 flex items-center ">
              <label htmlFor="password" className="w-10">
                {" "}
                Password{" "}
              </label>
              <input
                type={isShown ? "text" : "password"}
                id="password"
                required
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {showWrongPassword ? <Wrongpassword /> : null}
            <div className="mt-3 sm:ml-10 ml-16">
              <label htmlFor="checkbox">Show password ? </label>
              <input
                type="checkbox"
                id="checkbox"
                onChange={togglePassword}
                checked={isShown}
                className="focus:ring-0"
              ></input>
            </div>
            <div className="text-center mt-8 ">
              <button
                className="px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-embie-blue-light-600 hover:bg-indigo-700"
                type="submit"
                disabled={!isFormValid}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ModalTransition>
    </>
  );
};

export default Modalsignin;
