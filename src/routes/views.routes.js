import { Router } from "express";
import { prodService } from "../dao/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await prodService.getProducts();
  // console.log("productos", products);
  res.render("home", { products: products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realtime");
});

router.get("/carts", (req, res) => {
  res.render("carts");
});

export { router as viewsRouter };

// const users = [
//   {
//     nombre: "Pepe",
//     apellido: "perez",
//     edad: 20,
//     correo: "pepe@gmail.com",
//     telefono: "+9287244",
//   },

//   {
//     nombre: "Ana",
//     apellido: "Diaz",
//     edad: 30,
//     correo: "ana@gmail.com",
//     telefono: "+2347682",
//   },

//   {
//     nombre: "Maria",
//     apellido: "gomez",
//     edad: 35,
//     correo: "maria@gmail.com",
//     telefono: "+9817231",
//   },

//   {
//     nombre: "Camila",
//     apellido: "morales",
//     edad: 18,
//     correo: "camila@gmail.com",
//     telefono: "+0297812",
//   },

//   {
//     nombre: "Juan",
//     apellido: "castro",
//     edad: 27,
//     correo: "juan@gmail.com",
//     telefono: "+9827422",
//   },
// ];

// router.get("/contact", (req, res) => {
//   res.render("contact");
// });

// router.get("/profile", (req, res) => {
//   const randomNumber = Math.floor(Math.random() * users.length);
//   const user = users[randomNumber];
//   console.log("user", user);
//   res.render("profile", user);
// });
