var socket = io();

socket.on('data_push', function data_update(temp) {
  console.log(temp);
});