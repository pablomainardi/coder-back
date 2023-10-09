const socketClient = io();

console.log("VISTA REAL TIME");

const allProducts = document.getElementById("listadoProductos");

// Se reciben todos los productos
socketClient.on("productsAll", (allProd) => {
  //   console.log(allProd);
  let prodListHtml = "";
  allProd.map((p) => {
    prodListHtml += `<div class="items">
    <div id="title">${p.title}</div>
    <div class="imgThumb"><img src="${p.thumbnails}"></div>
    <div class="line1">${p.description}</div>
    <div class="line2">$ ${p.price}</div>
    <div class="line1">Categoria: ${p.category}</div>
    <div class="line2">Stock: ${p.stock}</div>
    <div class="line1">Codigo: ${p.code}</div>
    <div class="line2">ID: ${p._id}</div>
    </div>`;
  });
  allProducts.innerHTML = prodListHtml;
});

// // implementar socket para capturar desde un input text
// const inpField = document.getElementById("inputField");
// const chatBox = document.getElementById("boxChat");

// inpField.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     socketClient.emit("msgKey", inpField.value);
//   }
// });
// //   recibir historial del input a todos los clientes q se conecten
// socketClient.on("messages", (msgHistoryData) => {
//   console.log(msgHistoryData);
// });

// // emitir msg desde el Cliente al Servidor
// socketClient.emit("clientMessage", "Primer msg desde el cliente");

// // Recibir desde el Servidor
// socketClient.on("msgServer", (data) => {
//   console.log("data desde server", data);
// });

// // recibir msg para todos desde el server
// socketClient.on("msgServerAll", (data) => {
//   console.log("msg gral para todos desde el server", data);
// });
