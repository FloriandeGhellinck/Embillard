import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import gql, { hasura } from "../utils/gql";
import Wrongpassword from "../components/wrong-password";

const Loginpage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isShown, setIsShown] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [showWrongPassword, setShowWrongPassword] = useState<boolean>(false);

  const router = useRouter();

  const isFormValid = email && password;

  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  const checkLogin = async (e) => {
    e.preventDefault();

    const requestToLogin = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    setShowWrongPassword(requestToLogin.status !== 200);

    if (requestToLogin.status === 200) {
      router.push("/profile");
    }
  };

  return (
    <>
      <div className="min-h-full flex flex-col mx- 1 py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-embie-orange-200 via-embie-yellow-200 to-embie-blue-light-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/logo-embie.png"
            alt="embie"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 mx-1 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={checkLogin}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400  sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type={isShown ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400  sm:text-sm"
                  />
                </div>
              </div>

              {showWrongPassword ? <Wrongpassword /> : null}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <label
                    htmlFor="checkbox"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Show password{" "}
                  </label>
                  <input
                    id="checkbox"
                    type="checkbox"
                    onChange={togglePassword}
                    checked={isShown}
                    className="h-4 w-4 ml-1 border-gray-300 rounded"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  disabled={!isFormValid}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
