import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push("./");
  //   }, 3000);
  // }, []);

  return (
    <>
      <Head>
        <title>Error </title>
        <meta name="404 error" content="Billard error." />
      </Head>
      <div className="font-poppins text-center min-h-screen align-middle bg-gradient-to-r from-embie-orange-200 via-embie-yellow-200 to-embie-blue-light-300">
        <div className="flex justify-center items-center">
          <div className="align-middle">
            <h1 className="text-4xl"> Oooooops .... </h1>
            <h2 className="text-2xl"> This page could not be found </h2>
            <p>
              {" "}
              Go back to{" "}
              <Link href="/">
                <a className="text-embie-blue-light-600 bg-blue"> HomePage</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
