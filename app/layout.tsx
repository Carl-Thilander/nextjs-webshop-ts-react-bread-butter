import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Lobster_Two, Roboto } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import Footer from "./footer/page";
import Header from "./header/page";
import { CartProvider } from "../context/CartContext";
import theme from "./theme";
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});
const lobster = Lobster_Two({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata: Metadata = {
  title: "Bread&Butter",
  description:
    "Upptäck vårt breda utbud av ekologiskt bröd bakat med kärlek och noggrant utvalda ingredienser. Från klassiska surdegsbröd till nyskapande smaker - allt vi gör är både hållbart och fantastiskt gott.",
  keywords:
    "ekologiskt bröd, hantverksbröd, surdegsbröd, nybakat bröd, hållbar bakning, handgjort bröd, bageri, ekologiskt, brödleverans, naturliga ingredienser",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={[roboto.variable, lobster.className].join(" ")}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
              <SessionProvider>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                  }}
                >
                  <Header />

                  <Box component="main" sx={{ flex: "1" }}>
                    {children}
                  </Box>

                  <Footer />
                </Box>
              </SessionProvider>
            </CartProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
