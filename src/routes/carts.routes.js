import { Router } from "express";
import { cartsService } from "../dao/index.js";
//    "/api/carts"
const router = Router();

//crea un nuevo carrito
router.post("/", async (req, res) => {
  try {
    await cartsService.createCart();
    res.json({ message: "Carrito creado" });
  } catch (error) {
    res.json({ message: "Error al intentar crear el carrito" });
  }
});

//devuelve todos los productos de un carrito por id
router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const thisCart = await cartsService.getCartById(cartId);
    res.json(thisCart);
  } catch (error) {
    res.json({
      message:
        "Error al intentar devolver todos los productos por id de carrito",
    });
  }
});

//agrega un producto por id  al carrito seleccionado por id
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    // const data = req.body;
    await cartsService.addCart(cid, pid);

    res.json({ message: "Producto agregado al carrito" });
  } catch (error) {
    res.json({ message: "error al intentar agregar el producto" });
  }
});

//elimina un carrito por id
router.delete("/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    await cartsService.delCartById(cartId);
    res.json({ message: `Carrito con el ID ${cartId} fue eliminado` });
  } catch (error) {
    res.json({ message: "error al intentar eliminar el carrito" });
  }
});

//elimina un producto(id) del carrito segun su id
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    console.log(cid, pid);

    const result = await cartsService.delProdByIdInCartById(cid, pid);
    res.json({ message: `Carrito con el ID ${cid} fue eliminado`, result });
  } catch (error) {
    res.json({ message: "error al intentar eliminar el producto" });
  }
});

//Agrega CANTIDAD de producto del carro seleccionado
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;

    const result = await cartsService.addQuantityProd(cid, pid, quantity);
    res.json({
      message: `Carrito con el ID ${cid} se le agrego ${quantity} cantidades del producto con el ID ${pid}`,
      result,
    });
  } catch (error) {
    res.json({ message: "error al intentar agregar cantidades del producto" });
  }
});

// router.put("/userId:", (req, res) => {
//   res.json({ message: "endpoint put users" });
// });

export { router as cartsRouter };

// let users = [];

// //midleware de aplicacion
// router.use(function (req, res, next) {
//   console.log("peticion RREECIBIDA");
//   next();
// });

// //midleware para validad administrador
// const userRole = "usersss";
// const isAdmin = (req, res, next) => {
//   console.log("Validacion ejecutada");
//   if (userRole === "user") {
//     res.send("no tienes permisos");
//   } else {
//     next();
//   }
// };

// router.get("/", (req, res) => {
//   res.json(users);
// });
// //usando, midleware de validacion
// //  entre ruta y req-res
// router.post("/", isAdmin, (req, res) => {
//   const userInfo = req.body;
//   console.log("USER INFO", userInfo);
//   users.push(userInfo);
//   console.log(users);
//   res.json({ message: "Usuario Creado" });
// });
