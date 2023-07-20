import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import DisplayTask from "./DisplayTask";

const DeletedTask = ({ task }) => {
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
        id="prev-state"
        elevation={3}
        sx={{
          color: "rgb(82, 0, 0)",
          background: "rgb(247, 191, 191)",
          width: isSmallScreen ? "100%" : "90%",
          mb: isSmallScreen ? "1rem" : 0,
        }}
      >
        <DisplayTask task={task} />
      </Paper>
      <Paper
        id="new-state"
        elevation={3}
        sx={{
          color: "green",
          background: "rgb(212, 247, 224)",
          width: isSmallScreen ? "100%" : "9.5%",
        }}
      ></Paper>
    </Box>
  );
};

export default DeletedTask;
