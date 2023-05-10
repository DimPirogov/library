var socket = io();

const btnSend = document.querySelector('#send');
const input = document.querySelector('#input');
const messageBox = document.querySelector('#chatBox');

btnSend.addEventListener('click', () => {
  socket.emit('chat message', input.value);
  input.value = '';
});

socket.on('chat message', (message) => {
  messageBox.innerHTML += `<div style="background-color: rgba(0,255,255,.1)";>${message}</div>`;
  messageBox.lastChild.scrollIntoView();
});

socket.on('server message', (message) => {
  messageBox.innerHTML += `<div style="background-color: rgba(0,0,255,.1)";>${message}</div>`;
  messageBox.lastChild.scrollIntoView();
})
