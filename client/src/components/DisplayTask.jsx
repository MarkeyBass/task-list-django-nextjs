import {
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React from "react";

const DisplayTask = ({ task }) => {
  return (
    <CardContent>
      <Typography variant="h6" component="h6">
        {task.title}
      </Typography>
      <Typography color="textSecondary">{task.description}</Typography>
      <Typography color="textSecondary">
        <FormControlLabel
          control={<Checkbox checked={task.is_done} disabled />}
          label="Is Done"
        />
      </Typography>
    </CardContent>
  );
};

export default DisplayTask;
