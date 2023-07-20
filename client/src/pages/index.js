import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import { fetchTasks, addTask, updateTask, deleteTask } from "../api/tasks";

import EditTaskModal from "@/components/editTaskModal";
import ChangeList from "@/components/ChangeList";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [localTasks, setLocalTasks] = useState([]); // [{title, description, is_done, order }]
  const [localyDeletedTaskIds, setLocalyDeletedTaskIds] = useState([]);
  // const [newlyAddedTasks, setNewlyAddedTasks] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [orderHaveChanged, setOrderHaveChanged] = useState(false);
  const [changes, setChanges] = useState({});
  const [currentEditTask, setCurrentEditTask] = useState(null); // {} or null

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchAllTasks = async () => {
      const fetchedTasks = await fetchTasks();
      const tasksWithProperOrder = fetchedTasks.map((task, index) => ({
        ...task,
        order: index,
      }));
      setTasks(tasksWithProperOrder);
      setLocalTasks(tasksWithProperOrder);
    };
    fetchAllTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    // New tasks won't appear in the change list they will be added first to the db and then rendered to the DOM
    const addedTask = await addTask(newTask);
    if (addedTask) {
      setLocalTasks((prevTasks) => [...prevTasks, addedTask]);
      // setHasChanges(true);
      // setNewlyAddedTasks((prevTasks) => [...prevTasks, addedTask])
    }
  };

  const handleDeleteTask = async (taskId) => {
    setLocalyDeletedTaskIds((prevState) => [...prevState, taskId]);
    setLocalTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
    setHasChanges(true);
  };

  const handleMarkTaskAsDone = (taskId) => {
    const updatedTasks = localTasks.map((task) =>
      task.id === taskId ? { ...task, is_done: !task.is_done } : task
    );
    setLocalTasks(updatedTasks);
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    // Save local changes to the backend
    try {
      console.log({ localTasks, tasks });
      if (localyDeletedTaskIds.length > 0) {
        await Promise.all(localyDeletedTaskIds.map((id) => deleteTask(id)));
      }
      if (hasChanges || orderHaveChanged) {
        await Promise.all(localTasks.map((task) => updateTask(task.id, task)));
      }
      
      setChanges([]);
      setHasChanges(false);
      setOrderHaveChanged(false);
      setTasks(localTasks);
    
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleDiscardChanges = () => {
    setLocalTasks(tasks);
    setChanges([]);
    setHasChanges(false);
    setOrderHaveChanged(false);
  };

  // Local Update
  const handleTaskUpdate = (taskId, updatedFields) => {
    const updatedTasks = localTasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedFields } : task
    );
    setLocalTasks(updatedTasks);

    const taskServer = tasks.find((t) => t.id === taskId);
    const taskLocal = updatedTasks.find((t) => t.id === taskId);

    if (
      taskServer.title !== taskLocal.title ||
      taskServer.description !== taskLocal.description ||
      taskServer.is_done !== taskLocal.is_done ||
      taskServer.order !== taskLocal.order
    ) {

      setChanges((prevState) => ({
        ...prevState,
        [taskId]: { local: taskLocal, server: taskServer },
      }));
      setHasChanges(true);
    }
  };

  //                                     initial p. final position
  const handleTaskDragEnd = useCallback((dragIndex, hoverIndex) => {
    setLocalTasks((prevTasks) => {
      const draggedTask = prevTasks[dragIndex];
      const updatedTasks = prevTasks.reduce(
        (acc, card) => [...acc, { ...card }],
        []
      );
      updatedTasks.splice(dragIndex, 1);
      updatedTasks.splice(hoverIndex, 0, draggedTask);

      const updatedTasksFinal = updatedTasks.map((card, index) => ({
        ...card,
        order: index,
      }));
      return updatedTasksFinal;
    });

    setOrderHaveChanged(true)
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth={isSmallScreen ? "mt" : "md"} sx={{ mt: "3rem" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            mb: "1.8rem",
            textAlign: "center",
            fontSize: "2.6rem",
          }}
        >
          Task List
        </Typography>
        <AddTask onAddTask={handleAddTask} />
        <DndProvider backend={HTML5Backend}>
          <TaskList
            tasks={localTasks}
            onDragEnd={handleTaskDragEnd}
            onMarkTaskAsDone={handleMarkTaskAsDone}
            setCurrentEditTask={setCurrentEditTask}
            onUpdateTask={handleTaskUpdate}
            onDeleteTask={handleDeleteTask}
          />
        </DndProvider>
        {(hasChanges || orderHaveChanged) && (
          <ChangeList
            tasks={tasks}
            localTasks={localTasks}
            localyDeletedTaskIds={localyDeletedTaskIds}
            onDiscardChanges={handleDiscardChanges}
            onSaveChanges={handleSaveChanges}
            orderHaveChanged={orderHaveChanged}
            changes={changes}
          />
        )}
        {currentEditTask && (
          <EditTaskModal
            currentEditTask={currentEditTask}
            setCurrentEditTask={setCurrentEditTask}
            onUpdateTask={handleTaskUpdate}
          />
        )}
      </Container>
    </>
  );
};

export default HomePage;
