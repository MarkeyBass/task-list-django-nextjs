import React from 'react';
import { Card, CardContent, Typography, Paper } from '@material-ui/core';

const TaskItem = ({ task }) => {
  
  return (
    <Paper elevation={3} style={{ padding: '1rem' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {task.title}
          </Typography>
          <Typography color="textSecondary">{task.description}</Typography>
          <Typography color="textSecondary">Status: {task.is_done ? 'Done' : 'Not Done'}</Typography>
          <button onClick={handleMarkAsDone}>{task.is_done ? 'Mark as Not Done' : 'Mark as Done'}</button>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default TaskItem;
