import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    console.error('Error Description:', error.response.data.description);
    return error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/`, task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    console.error('Error Description:', error.response.data.description);
    return null;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}/`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    console.error('Error Description:', error.response.data.description);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    return null;
  }
};