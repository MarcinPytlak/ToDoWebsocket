const express = require('express');
const socket = require('socket.io');
const app = express();

const tasks = [];

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('updateData', tasks); 
  socket.on('addTask', (taskName) => {
    let task = taskName.name;
    tasks.push(task);

    let message = {name: taskName.name};
    socket.broadcast.emit('addTask', message);
  });
  socket.on('removeTask', (taskIndex) => {
    tasks.splice(taskIndex, 1);
    socket.broadcast.emit('removeTask', taskIndex);
  });
});