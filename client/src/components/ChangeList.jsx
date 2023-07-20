import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import ChangedTask from "./ChangedTask";
import DeletedTask from "./DeletedTask";
import OrderHaveChanged from "./OrderHaveChanged";

const ChangeList = ({
  onSaveChanges,
  onDiscardChanges,
  tasks,
  localyDeletedTaskIds,
  changes,
  orderHaveChanged
}) => {
  const localyDeletedTasks = tasks.filter((task) =>
    localyDeletedTaskIds.includes(task.id)
  );

  return (
    <Box mt={1} mb={6}>
      <Box sx={{ mb: "1rem" }}>
        <Button
          sx={{ mr: "1rem" }}
          variant="contained"
          color="primary"
          onClick={onSaveChanges}
        >
          Save Changes
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onDiscardChanges}
        >
          Discard Changes
        </Button>
      </Box>
      <Typography variant="h6" component="h6" mb={2}>Change List</Typography>
      {orderHaveChanged && <OrderHaveChanged />}
      {localyDeletedTasks.map((task) => {
        return <DeletedTask key={task.id} task={task} />;
      })}
      {Object.keys(changes).map((key) => {
        return <ChangedTask key={key} change={changes[key]} />;
      })}
    </Box>
  );
};

export default ChangeList;
