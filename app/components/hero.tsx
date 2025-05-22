"use client";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "95vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          animation: "zoomIn 4s ease-out forwards", // Animationen appliceras direkt här
          "@keyframes zoomIn": {
            "0%": {
              transform: "scale(1)", // Startar utan zoom
            },
            "100%": {
              transform: "scale(1.1)", // Zoomar in till 1.1
            },
          },
          "& img": {
            objectFit: "cover",
            objectPosition: "center",
          },
        }}
      >
        <Image
          src="/images/hero.png"
          alt="Hero image"
          priority={true} // Viktig bild, Next.js optimerar laddning
          quality={90} // Förbättrar bildkvaliteten
          layout="fill"
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "60px",
            color: "background.paper",
            textShadow: "3px 3px 6px rgba(65, 6, 1, 0.5)",
          }}
        >
          Welcome to Bean & Leaf
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: "1rem",
            color: "background.paper",
            textShadow: "5px 5px 8px rgba(65, 6, 1, 0.5)",
          }}
        >
          Exclusive coffee beans and tea leaves, shipping worldwide!
        </Typography>

          
         
          
          

      </Box>
          <Box
          sx={{
            position: "absolute",
            bottom: "0.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            "@keyframes bounce": {
            "0%, 100%": {
            transform: "translateY(0)",
             },
            "50%": {
            transform: "translateY(-15px)",
              },
            },
          }}
          >

          <KeyboardArrowDownIcon 
           onClick={() => {
      const element = document.getElementById("products");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }}
           sx={{
            color: "white",
             fontSize: "10rem",
             marginTop: "2rem",
             animation: "bounce 2s infinite",
            cursor: "pointer",
            "&:hover": {
               transform: "scale(1.1)",
             },
            
           }}
          />
          </Box>
    </Box>
  );
};

export default Hero;
