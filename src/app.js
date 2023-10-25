import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "path";
import { viewsRouter } from "./routes/views.routes.js";
// importando productos
import { cartsService, chatService, prodService } from "./dao/index.js";
// Implementando Socket IO
import { Server } from "socket.io";

// importando funcion base de datos
import { connectDB } from "./config/dbConnection.js";

import { cartsRouter } from "./routes/carts.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { chatsRouter } from "./routes/chat.routes.js";

import { CartManager } from "./dao/cartManager.js";

//Servidor express
//Al subirlo a produccion cambiar a: -----
const port = process.env.PORT || 8080;
// const port = 8080;
const app = express();
// Servidor de HTTP
const httpServer = app.listen(port, () => console.log("Server Funcionando OK"));
// Server de  Socket IO para Backend
const io = new Server(httpServer);
// Conexion base de datos
connectDB();
// Integrando proyecto de productos XXXXX

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion del motor de plantillas (HANDLEBARS)
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));

//routes}
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use(viewsRouter);
app.use(chatsRouter); // routes chat
//routes}

// arreglo de msg capturados del cliente por el input
// let msgHistory = [];
// Socket configuracion
io.on("connection", async (socket) => {
  console.log("cliente conectado", socket.id);
  const allProd = await prodService.getProducts();
  // console.log("DESDE APPPPPPPPPPPPPPPPP", allProd);
  socket.emit("productsAll", allProd);

  // Recibimos producto a agregar del cliente
  socket.on("addProd", async (data) => {
    await prodService.addProduct(data);
    const products = await prodService.getProducts();
    io.emit("productsAll", products);
  });

  // Recibimos producto a eliminar del cliente
  socket.on("delProd", async (data) => {
    await prodService.deleteProduct(data);
    const products = await prodService.getProducts();
    io.emit("productsAll", products);
  });

  // SERVICIO DE CARRO DE COMPRAS
  socket.on("pAddCart", async (pid) => {
    // si no hay carro creado  no esta creando el carro, necesitamos el id del carro
    // desde boton agregar al carro
    // await cartsService.createCart(); //creamos el carro
    const carts = await cartsService.getAllCarts(); // traemos a una variable todos los carros
    const cid = carts[carts.length - 1]._id; //buscamos el ultimo carro
    await cartsService.addCart(cid, pid); // agregamos producto
  });

  //trae todos los carros
  const carts = await cartsService.getAllCarts();
  socket.emit("cartAll", carts);

  //para eliminar un carro
  socket.on("delCart", async (cid) => {
    await cartsService.delCartById(cid);
    console.log(`Se ha eliminado el carro con ID ${cid}`);
    const carts = await cartsService.getAllCarts();
    socket.emit("cartAll", carts); // agregamos producto
  });

  //para eliminar un producto del carro
  socket.on("delProdCart", async (data) => {
    const { cid, pid } = data;
    await cartsService.delProdByIdInCartById(cid, pid);
    console.log(
      `Se ha eliminado el producto con ID ${pid} del carrito con ID ${cid}`
    );
    const carts = await cartsService.getAllCarts();
    io.emit("cartAll", carts);
  });

  // agregar mas cantidades al carro (desde vista carts)
  socket.on("inpQtyBtn", async (cid, pid, qty) => {
    // console.log("cid", cid);
    // console.log("pid", pid);
    // console.log("qty", qty);
    await cartsService.addQuantityProd(cid, pid, qty);
    const carts = await cartsService.getAllCarts();
    io.emit("cartAll", carts);
  });

  //VISTA de Carro ID
  socket.on("dataCart", async (data) => {
    const result = await cartsService.getCartById(data);
    return result;
  });

  // SERVICIO DE CHAT
  const historyMsg = await chatService.getHistoryChat();
  io.emit("chatHistory", historyMsg);

  socket.on("msgChat", async (data) => {
    await chatService.addChat(data);
    const historyMsg = await chatService.getHistoryChat();
    io.emit("chatHistory", historyMsg);
  });
});
// socket.on("chatSend", async (data) => {
//   await chatService.addChat(data);
//   const historyChat = await chatService.getHistoryChat();
//   io.emit("historyChat", historyChat);
// });

// //   simular input text en home
// socket.on("msgKey", (data) => {
//   const msgItem = { socketid: socket.id, mensaje: data };
//   msgHistory.push(msgItem);
//   console.log("input msg desde el cliente", msgItem);
// });
// //   enviar historial del input a todos los clientes q se conecten
// socket.emit("messages", msgHistory);

// // Socket Recibir mensaje del cliente
// socket.on("clientMessage", (data) => {
//   console.log(data);
// });

// setTimeout(() => {
//   socket.emit("msgServer", "Canal Abierto Server");
// }, 3000);
// // Mensajes para todos desde el servidor
// setTimeout(() => {
//   io.emit("msgServerAll", "Msg para TODOS");
// }, 3000);

//SIN USAR __DIRNAME
// import express from "express";
// import { engine } from "express-handlebars";
// // import { __dirname } from "../src/utils.js";
// // import path from "path";

// //Servidor express
// const port = 8080;
// const app = express();
// app.listen(port, () => console.log("Server Funcionando OK"));

// //configuracion del motor de plantillas
// app.engine("hbs", engine({ extname: ".hbs" }));
// app.set("view engine", ".hbs");
// app.set("views", "./views");

// //routes}
// app.get("/", (req, res) => {
//   res.render("home");
// });
