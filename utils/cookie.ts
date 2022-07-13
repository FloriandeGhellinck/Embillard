import { getCookie } from "cookies-next";
import { CookieUser } from "../Types/game";

const getUser: () => CookieUser = () => {
  const cookieFromHomePage = getCookie("dataUser");

  const playerConnected: CookieUser = cookieFromHomePage
    ? JSON.parse(cookieFromHomePage.toString())
    : { name: "loading" };

  return playerConnected;
};
export default getUser;
