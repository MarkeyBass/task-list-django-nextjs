import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Paper,
  Grid,
  Box,
  Button,
} from "@mui/material";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import { fetchTasks, addTask, updateTask, deleteTask } from "../api/tasks";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import EditTaskModal from "@/components/editTaskModal";

const status = {CREATE: "create", UPDATE: "update", DELETE: "delete", NO_CHANGE: "noChange"};

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [localTasks, setLocalTasks] = useState([]); // [{title, description, isDone, order, status}]
  const [hasChanges, setHasChanges] = useState(false);
  const [changes, setChanges] = useState([]);
  const [currentEditTask, setCurrentEditTask] = useState(null); // {} or null

  useEffect(() => {
    // Fetch tasks from the backend on component mount
    const fetchAllTasks = async () => {
      const fetchedTasks = await fetchTasks();
      //TODO: order set tasks by task.order
      setTasks(fetchedTasks);
      setLocalTasks(() => fetchedTasks.map(t => ({ status: status.NO_CHANGE, ...t})));
    };
    fetchAllTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    // Add a new task to the backend
    const addedTask = await addTask(newTask);
    if (addedTask) {
      // setTasks((prevTasks) => [...prevTasks, addedTask]);
      setLocalTasks((prevTasks) => [...prevTasks, addedTask]);
      setHasChanges(true);
    }
  };

  const handleDeleteTask = async (taskId) => {
    // Delete a task from the backend
    const deletedTask = await deleteTask(taskId);
    if (deletedTask) {
      // setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setLocalTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
      setHasChanges(true);
    }
  };

  const handleTaskDragEnd = async (taskId, newIndex) => {
    // Update the task order on drag & drop end
    const updatedTask = tasks.find((task) => task.id === taskId);
    if (updatedTask && updatedTask.order !== newIndex) {
      updatedTask.order = newIndex;
      // const updatedTaskResponse = await updateTask(taskId, updatedTask);
      if (updatedTaskResponse) {
        // setTasks((prevTasks) =>
        //   prevTasks.map((task) => (task.id === taskId ? updatedTaskResponse : task))
        // );
        setLocalTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? updatedTaskResponse : task
          )
        );
        setHasChanges(true);
      }
    }
  };

  const handleMarkTaskAsDone = (taskId) => {
    // Update the local task list to mark a task as done
    const updatedTasks = localTasks.map((task) =>
      task.id === taskId ? { ...task, is_done: !task.is_done } : task
    );
    setLocalTasks(updatedTasks);
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    // Save local changes to the backend
    try {
      await Promise.all(localTasks.map((task) => updateTask(task.id, task)));
      setTasks(localTasks);
      setChanges([]);
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      // Handle error if needed
    }
  };

  const handleDiscardChanges = () => {
    // Discard local changes and restore the local state from the backend
    setLocalTasks(tasks);
    setChanges([]);
    setHasChanges(false);
  };

  const handleTaskUpdate = (taskId, updatedFields) => {
    // Update the local task list and add the changes to the "Changes" section
    console.log("here");
    const updatedTasks = localTasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedFields } : task
    );
    setLocalTasks(updatedTasks);

    if (changes.some((change) => change.id === taskId)) {
      // If there is already a change for this task, update it
      setChanges((prevChanges) =>
        prevChanges.map((change) =>
          change.id === taskId ? { ...change, ...updatedFields } : change
        )
      );
    } else {
      // Otherwise, add a new change entry
      setChanges((prevChanges) => [
        ...prevChanges,
        { id: taskId, ...updatedFields },
      ]);
    }
    setHasChanges(true);
  };

  return (
    <>
      {/* <DndProvider backend={HTML5Backend}> */}
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: "4rem" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: "3rem" }}
        >
          Task List App
        </Typography>
        {/* <AddCircleOutlineIcon /> */}
        <AddTask onAddTask={handleAddTask} />
        <TaskList
          tasks={localTasks}
          onDeleteTask={handleDeleteTask}
          onDragEnd={handleTaskDragEnd}
          onMarkTaskAsDone={handleMarkTaskAsDone}
          onUpdateTask={handleTaskUpdate}
          setCurrentEditTask={setCurrentEditTask}
        />
        {hasChanges && (
          <Box mt={3}>
            <Typography variant="h5" component="h2" gutterBottom>
              Changes
            </Typography>
            <ul>
              {changes.map((change) => (
                <li key={change.id}>
                  Task ID: {change.id}, Changes: {JSON.stringify(change)}
                </li>
              ))}
            </ul>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDiscardChanges}
            >
              Discard Changes
            </Button>
          </Box>
        )}
        {currentEditTask && (
          <EditTaskModal
            currentEditTask={currentEditTask}
            setCurrentEditTask={setCurrentEditTask}
            handleTaskUpdate={handleTaskUpdate}
          />
        )}
      </Container>
      {/* </DndProvider> */}
    </>
  );
};

export default HomePage;
