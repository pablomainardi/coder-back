import { Router } from "express";
import { prodService, cartsService } from "../dao/index.js";

const router = Router();

//PAGINATE
router.get("/", async (req, res) => {
  // const dataProducts = await prodService.getProductsPaginate();
  // const filterProducts = dataProducts;
  // console.log("VIEWS-FILTER", filterProducts);
  // res.render("home", { dataProducts: filterProducts });
  // console.log("DATAAAPRODUCTSS", dataProducts);
  res.render("home");
});

router.get("/products", async (req, res) => {
  const dataProducts = await prodService.getProductsPaginate();
  const filterProducts = dataProducts;
  res.render("products", { dataProducts: filterProducts });
});

router.get("/products/:pageNumber", async (req, res) => {
  const pageNumber = parseInt(req.params.pageNumber) || 1;
  const limit = parseInt(req.params.limit) || 10;
  const order = req.params.order || "asc";

  // A continuación, puedes utilizar pageNumber, limit y order en tu lógica.

  const dataProducts = await prodService.getProductsPaginate(
    pageNumber,
    limit,
    order
  );
  const filterProducts = dataProducts;

  res.render("products", { dataProducts: filterProducts });
});

router.get("/products/:pageNumber/:limit/:order", async (req, res) => {
  const pageNumber = parseInt(req.params.pageNumber) || 1;
  const limit = parseInt(req.params.limit) || 10;
  const order = req.params.order || "asc";

  // A continuación, puedes utilizar pageNumber, limit y order en tu lógica.

  const dataProducts = await prodService.getProductsPaginate(
    pageNumber,
    limit,
    order
  );
  const filterProducts = dataProducts;

  res.render("products", { dataProducts: filterProducts });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realtime");
});

router.get("/carts", (req, res) => {
  res.render("carts");
});

//VISTA DE CARRO CON TODOS LOS PRODUCTOS
router.get("/cartid/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  const dataCart = await cartsService.getCartById(id);

  const cartProducts = dataCart.carts.map((cart) => {
    return {
      title: cart.productId.title,
      thumbnails: cart.productId.thumbnails,
      code: cart.productId.code,
      stock: cart.productId.stock,
      status: cart.productId.status ? "Available" : "Not Available",
      description: cart.productId.description,
      price: cart.productId.price,
      productId: cart.productId._id,
      quantity: cart.quantity,
    };
  });

  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", cartProducts);

  res.render("cartid", { cartProducts: cartProducts });
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
