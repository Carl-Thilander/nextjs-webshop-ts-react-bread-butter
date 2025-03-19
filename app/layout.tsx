import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Lobster_Two, Roboto } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import Footer from "./footer/page";
import Header from "./header/page";
import CartProvider from "./provider";
import theme from "./theme";

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

/* Beskriv din hemsida för sökmotorerna */
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh", // Makes sure page fills screen height
                }}
              >
                <Header />

                <Box component="main" sx={{ flex: "1" }}>
                  {children}
                </Box>

                <Footer />
              </Box>
            </CartProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
