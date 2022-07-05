import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components/header";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
