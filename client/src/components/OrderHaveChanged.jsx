import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const OrderHaveChanged = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        mb: "0.2rem",
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: isSmallScreen ? "center" : "space-between",
      }}
    >
      <Paper
        id="new-state"
        elevation={3}
        sx={{
          color: "green",
          background: "rgb(212, 247, 224)",
          width: isSmallScreen ? "100%" : "90%",
        }}
        >

      <Typography sx={{
        padding: "0.5rem",
        ml: "1rem",
        fontSize: "1.1rem"
      }}>Tasks Order Have Changed</Typography>

      </Paper>
      <Paper
        id="prev-state"
        elevation={3}
        sx={{
          color: "rgb(82, 0, 0)",
          background: "rgb(247, 191, 191)",
          width: isSmallScreen ? "100%" : "9.5%",
          mb: isSmallScreen ? "1rem" : 0,
        }}
      >
      </Paper>
    </Box>
  );
};

export default OrderHaveChanged;
