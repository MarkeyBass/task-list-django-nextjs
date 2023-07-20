import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  Card,
  CardContent,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import IconButton from "@mui/material/IconButton";

export const ItemTypes = {
  CARD: "card",
};

const Task = ({
  task,
  index,
  onDragEnd,
  setCurrentEditTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const draggableRef = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(task, monitor) {
      if (!draggableRef.current) {
        return;
      }
      const dragIndex = task.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = draggableRef.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      onDragEnd(dragIndex, hoverIndex);
      task.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id: task.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(draggableRef));

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isDone, setIsDone] = useState(task.is_done);

  const handleTaskIsDoneChange = (e) => {
    setIsDone(e.target.checked);
    onUpdateTask(task.id, { title, description, is_done: e.target.checked });
  };

  const handleDelete = (e) => {
    let text =
      "Are you sure you want to delete the task?\nPress OK to delete or Cancel.";
    if (confirm(text) == true) {
      text = "You pressed OK!";
      onDeleteTask(task.id);
    } else {
      text = "You canceled!";
    }

    console.log(text);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        marginBottom: "0.2rem",
        opacity: isDragging ? 0.5 : 1,
      }}
      data-handler-id={handlerId}
      ref={draggableRef}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: isDone && "rgb(225, 225, 225)",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {task.title}
          </Typography>
          <Typography color="textSecondary">{task.description}</Typography>
          <Typography color="textSecondary">
            <FormControlLabel
              control={
                <Checkbox onChange={handleTaskIsDoneChange} checked={isDone} />
              }
              label="Is Done"
            />
          </Typography>
        </CardContent>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={handleDelete}
          >
            <DeleteForeverIcon />
          </IconButton>
          <IconButton
            aria-label="update"
            color="primary"
            onClick={() => setCurrentEditTask(task)}
          >
            <BorderColorIcon />
          </IconButton>
          <IconButton
            sx={{
              "&:hover": {
                cursor: "grab",
              },
              "&:mousedown": {
                cursor: "grabbing",
              },
              "&:active": {
                cursor: "grabbing",
              },
            }}
            aria-label="drag-and-drop"
          >
            <DragIndicatorIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default Task;
