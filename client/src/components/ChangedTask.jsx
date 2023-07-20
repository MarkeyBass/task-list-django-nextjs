import { Box, Paper, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import DisplayTask from './DisplayTask';

const ChangedTask = ({ change }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
    sx={{
      mb: "1rem",
      display: 'flex',
      flexDirection: isSmallScreen ? "column" : "row",
      justifyContent: isSmallScreen ? "center" : "space-between",
    }}
  > 
      <Paper
          id="prev-state"
          elevation={3}
          sx={{
            color: "rgb(82, 0, 0)",
            background: "rgb(255, 226, 226)",
            width: isSmallScreen ? "100%" : "49.5%",
            mb: isSmallScreen ? "1rem" : 0,
          }}
        >
          <DisplayTask task={change.server}/>
        </Paper>
        <Paper
          id="new-state"
          elevation={3}
          sx={{
            color: "rgb(0, 82, 11)",
            background: "rgb(212, 247, 224)",
            width: isSmallScreen ? "100%" : "49.5%",
          }}
        >
          <DisplayTask task={change.local}/>
        </Paper>
    </Box>
  )
}

export default ChangedTask