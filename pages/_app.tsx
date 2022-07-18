import "../styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

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
