// socket thingies
let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

socket.onopen = () => console.log("Successfully Connected");

socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};

socket.onerror = error => console.log("Socket Error: ", error);


const KEY_ARRAY = [
  'k1', 'k2', 'm1', 'm2'
];

socket.onmessage = event => {
  let data = JSON.parse(event.data);

  let keyOverlay = data.gameplay.keyOverlay;

  if (data.menu.state == 2) {
    KEY_ARRAY.forEach(key => {
      if (keyOverlay[key].isPressed) {
        input[key] = true;
      } else if (!keyOverlay[key].isPressed) {
        input[key] = false;
      }
    });
  } else {
    KEY_ARRAY.forEach(key => {
      input[key] = false;
    });
  }
};
