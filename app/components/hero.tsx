import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "90vh",
        overflow: "hidden",
        boxShadow: 4,
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
          src="/images/hero.jpg"
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
            fontWeight: "bold",
            color: "background.paper",
            textShadow: "3px 3px 6px rgba(65, 6, 1, 0.5)",
          }}
        >
          Välkommen till Bread&Butter
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: "1rem",
            color: "background.paper",
            textShadow: "5px 5px 8px rgba(65, 6, 1, 0.5)",
          }}
        >
          Ekologiskt hantverksbröd direkt till din dörr
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
