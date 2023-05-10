const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io =  new Server(server);

app.use(express.static('public'));
const PORT = 3000;

server.listen(PORT, () => {
  console.log('Chat loaded - listening on port:' + PORT);
});

app.get('/book', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/newBook', (req, res) => {
  res.sendFile(__dirname + '/newBook.html');
})

app.get('/update/:id', (req, res) => {
  res.sendFile(__dirname + '/update.html')
})


// chat section
app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
})

const mainRoom = 'main room';
const waitingRoom = 'waiting room';
let users = 0;
let peopleInMainRoom = 0;
let peopleInWaitingRoom = 0;

io.on('connection', (socket) => {
  users++;
  console.log("Totala antalet: " + users);
  if(peopleInMainRoom < 2) {
    peopleInMainRoom++;
    if(peopleInMainRoom == 2)
      socket.to(mainRoom).emit('server message', 'Ny användare är i chatten!' )
    socket.join(mainRoom);
    socket.emit('server message', 'Välkommer till chatten');
    console.log("Antal i huvudrum: " + peopleInMainRoom);
  }else{
    peopleInWaitingRoom++;
    socket.join(waitingRoom);
    socket.emit('server message', 'Välkommer till väntrummer ' );
    socket.emit('server message', 'Antal i väntrum: '+ peopleInWaitingRoom +' Du är placerad i kö..');
    console.log("Antal i väntrum: " + peopleInWaitingRoom);
  }

  socket.on('chat message', (message) => {
    io.to(mainRoom).emit('chat message', message);
  })

  socket.on('disconnecting', () => {
    let iterator = socket.rooms.keys();
    iterator.next();
    let room = iterator.next().value;
    if(room === 'waiting room')
      peopleInWaitingRoom--;
    else{
      peopleInMainRoom--;
      socket.to(waitingRoom).emit('server message', 'Chatten är ledig! Klicka på "Chatta" ')
    }
    console.log('Användare bortkopplades');
    users--;
  });
})
