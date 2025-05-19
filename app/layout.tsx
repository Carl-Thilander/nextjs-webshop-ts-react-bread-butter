import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Montserrat, Poppins } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import Footer from "./footer/page";
import Header from "./header/page";
import { CartProvider } from "../context/CartContext";
import theme from "./theme";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});
const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Bean & Leaf",
  description: "Discover exclusive coffee beans and tea leaves",
  keywords: "tea, coffee, exclusive, tealover, coffee bean, tea leaves",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={[poppins.variable, montserrat.className].join(" ")}>
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
