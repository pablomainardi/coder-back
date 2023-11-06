import { Router } from "express";
import { prodService, userService, cartsService } from "../dao/index.js";

const router = Router();

//PAGINATE
router.get("/", async (req, res) => {
  if (req.session.userMail) {
    const userMail = req.session.userMail;
    const user = await userService.getUserByMail(userMail);
    res.render("home", { user });
  } else {
    res.cookie("productosCookie", "Ofertas").render("login");
  } //enviamos la cookie
});

// LOGIN ------------------------------------------------------------------------------------------------------

// router.get("/login", async (req, res) => {
//   console.log(req.cookies); // traemos las cookies
//   res
//     .cookie("userData", { email: "pepe@gmail.com", role: "admin" })
//     .render("login");
// });
// router.get("/signup", async (req, res) => {
//   res.render("signup");
// });

router.get("/profile", async (req, res) => {
  if (req.session.userMail) {
    const userMail = req.session.userMail;
    const user = await userService.getUserByMail(userMail);
    res.render("profile", { user });
  } else {
    res.render("login", { message: "Aun no ha iniciado sesion" });
  }
});

// router.get("/login/cookie-signed", async (req, res) => {
//   console.log("signed", req.signedCookies); // traemos las cookies
//   res
//     .cookie(
//       "signed-cookie",
//       { sitio: "productos.com", type: "sports" },
//       { signed: true }
//     )
//     .render("login");
// });

//VISTA PRODUCTOS CON PAGINATE
router.get("/products/:page?/:limit?/:sort?", async (req, res) => {
  const { page, limit, sort } = req.params;

  // Convertir a enteros y comprobar valores válidos
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const sortOrder = sort === "desc" ? "desc" : "asc";

  const result = await prodService.getProductsPaginate(
    pageNumber,
    limitNumber,
    sortOrder
  );

  const dataProducts = {
    status: "success",
    payload: result.docs,
    totalDocs: result.totalDocs,
    limit: result.limit,
    totalPages: result.totalPages,
    page: result.page,
    pagingCounter: result.pagingCounter,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
  };

  // console.log(dataProducts);
  res.cookie("productosCookie", "Ofertas222").render("products", dataProducts);
});

router.get("/realtimeproducts", async (req, res) => {
  if (req.session.userMail) {
    const userMail = req.session.userMail;
    const user = await userService.getUserByMail(userMail);
    res.render("realtime", { user });
  } else {
    res.render("login");
  }
});

router.get("/carts", async (req, res) => {
  if (req.session.userMail) {
    const userMail = req.session.userMail;
    const user = await userService.getUserByMail(userMail);
    res.render("carts", { user });
  } else {
    res.render("carts");
  }
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
