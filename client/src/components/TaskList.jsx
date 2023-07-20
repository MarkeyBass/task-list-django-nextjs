import React from "react";
import { List } from "@mui/material";
import Task from "./Task";

const TaskList = ({
  tasks,
  onDeleteTask,
  onDragEnd,
  setCurrentEditTask,
  onMarkTaskAsDone,
  onUpdateTask,
}) => {
  return (
    <List>
      {tasks.map((task, index) => {
        return (
          <Task
            key={task.id}
            index={index}
            task={task}
            onDragEnd={onDragEnd}
            setCurrentEditTask={setCurrentEditTask}
            onMarkTaskAsDone={onMarkTaskAsDone}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        );
      })}
    </List>
  );
};

export default TaskList;
