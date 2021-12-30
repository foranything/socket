var socket;

const list = document.getElementById("list");
let connected = false;

function socketInit() {
  socket = new WebSocket(`ws://${window.location.host}`);

  socket.addEventListener("open", () => {
    connected = true;
    const child = document.createElement("li");
    child.innerHTML = "Connected to server✅";
    list.appendChild(child);
    list.scrollTop = list.scrollHeight;
  });

  socket.addEventListener("message", (msg) => {
    console.log("Message:", msg.data);
    const child = document.createElement("li");
    child.innerHTML = msg.data;
    list.appendChild(child);
    list.scrollTop = list.scrollHeight;
  });

  socket.addEventListener("close", () => {
    connected = false;
    const child = document.createElement("li");
    child.innerHTML = `Disconnected to server❌`;
    list.appendChild(child);
    list.scrollTop = list.scrollHeight;
  });
}

socketInit();

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!connected) {
    socketInit();
  } else {
    socket.send(e.target[0].value);
    e.target[0].value = "";
  }
});
