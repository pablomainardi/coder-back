import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "path";
import { viewsRouter } from "./routes/views.routes.js";
// importando productos
import { prodService } from "./persistence/index.js";
// Implementando Socket IO
import { Server } from "socket.io";

//Servidor express
//Al subirlo a produccion cambiar a: -----
const port = process.env.PORT || 8080;
// const port = 8080;
const app = express();
// Servidor de HTTP
const httpServer = app.listen(port, () => console.log("Server Funcionando OK"));
// Server de  Socket IO para Backend
const socketServer = new Server(httpServer);

// Integrando proyecto de productos XXXXX
import { cartsRouter } from "./routes/carts.routes.js";
import { productsRouter } from "./routes/products.routes.js";
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

//configuracion del motor de plantillas (HANDLEBARS)
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));

//routes}
app.use(viewsRouter);

// arreglo de msg capturados del cliente por el input
// let msgHistory = [];
// Socket configuracion
socketServer.on("connection", async (socket) => {
  console.log("cliente conectado", socket.id);
  const productos = await prodService.getProducts();
  socket.emit("productsAll", productos);
  // Recibimos producto a agregar del cliente
  socket.on("addProd", async (data) => {
    await prodService.addProduct(
      data.title,
      data.description,
      data.code,
      data.price,
      data.stock,
      data.category,
      data.thumbnails
    );
    const products = await prodService.getProducts();
    socketServer.emit("productsAll", products);
  });
  // Recibimos producto a eliminar del cliente
  socket.on("delProd", async (data) => {
    await prodService.deleteProduct(data);
    const products = await prodService.getProducts();
    socketServer.emit("productsAll", products);
  });
});
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
//   socketServer.emit("msgServerAll", "Msg para TODOS");
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
