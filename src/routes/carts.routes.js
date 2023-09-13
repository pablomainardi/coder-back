import { Router } from "express";
import { cartService } from "../persistence/index.js";

const router = Router();

//crea un nuevo carrito
router.post("/", async (req, res) => {
  try {
    await cartService.createCart();
    res.json({ message: "Carrito creado" });
  } catch (error) {
    res.json({ message: "Error al intentar crear el carrito" });
  }
});

//devuelve todos los productos de un carrito por id
router.get("/:cid", async (req, res) => {
  try {
    const cartId = Number(req.params.cid);
    const thisCart = await cartService.getProductByCartId(cartId);
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
    const cartId = Number(req.params.cid);
    const prodId = Number(req.params.pid);

    // const data = req.body;
    await cartService.addCart(cartId, prodId);

    res.json({ message: "Producto agregado al carrito" });
  } catch (error) {
    res.json({ message: "error al intentar agregar el producto" });
  }
});

// router.delete("/:userId", (req, res) => {
//   res.json({ message: "endpoint delete users" });
// });

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
