console.log("CHAT GENERAL");

const socketClient = io();
const userName = document.getElementById("userName");
const inputMsg = document.getElementById("inputMsg");
const chatBox = document.getElementById("chatBox");

let user; // usuario de chat alias

Swal.fire({
  title: "Bienvenidos al Chat General",
  text: "Ingresa un Alias",
  input: "text",
  inputValidator: (value) => {
    return !value && "Por favor ingresa un Alias";
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then((inputValue) => {
  console.log(inputValue.value);
  user = inputValue.value; //obtenemos el alias del usuario
  userName.innerHTML = user;
});

//recibimos historial de msg
socketClient.on("chatHistory", (historyChatServer) => {
  // console.log(historyChatServer);
  let historyChats = "";
  historyChatServer.map((p) => {
    historyChats += `<div class="chatMsgBox">
      <div class="chatUser">${p.user}:</div>
      <div class="chatMsg">${p.message}></div>
      </div>`;
    chatBox.innerHTML = historyChats;
    chatBox.scrollTop = chatBox.scrollHeight;
  });
});

const userAndMsg = () => {
  const msg = { user: user, message: inputMsg.value };
  //   console.log(msg);
  socketClient.emit("msgChat", msg);
  inputMsg.value = "";
  inputMsg.focus();
};

// para enviar mensaje click /enter
sendBtnMsg.addEventListener("click", userAndMsg);
inputMsg.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    userAndMsg();
  }
});
