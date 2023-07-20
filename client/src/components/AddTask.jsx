import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';

const AddTask = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <Paper elevation={3} style={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Task Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '1rem' }}
          required
        />
        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginLeft: 'auto' }}>
          Add Task
        </Button>
      </form>
    </Paper>
  );
};

export default AddTask;