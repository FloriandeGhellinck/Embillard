import Navbar from "../components/navbar";
import Home_Page from "./home_page";
import { NextPage } from "next";
import { Header } from "../components/header";

const Home: NextPage = () => {
  return (
    <>
      <Header />

      <Home_Page />
    </>
  );
};

export default Home;
