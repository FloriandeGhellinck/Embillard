import "../styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const router = useRouter();

  const cookieValue = getCookie("dataUser");

  useEffect(() => {
    if (!cookieValue) {
      router.push("/login");
    }
  }, [cookieValue, router]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
