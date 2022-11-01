import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";

import { BottomNavigation } from "../components/BottomNavigation";
import Head from "next/head";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <SessionProvider session={session}>
        <CssBaseline />

        <Head>
          <title>COPAlpites</title>
        </Head>

        <Component {...pageProps} />

        <BottomNavigation />
      </SessionProvider>
    </ThemeProvider>
  );
}
