const express = require('express');
const socket = require('socket.io');
const app = express();

const tasks = [];

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('updateData', ()=>{
    socket.emit('updateTasks', tasks);
  }); 
  socket.on('addTask', ({ id, name }) => {
    const task = {id, name};
    tasks.push(task);
    socket.broadcast.emit('addTask', task);
  });
  socket.on('removeTask', (taskIndex) => {
    tasks.splice(taskIndex, 1);
    socket.broadcast.emit('removeTask', taskIndex);
  });
});