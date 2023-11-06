import { Router } from "express";
import { userService } from "../dao/index.js";

const router = Router();

router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.log("registrar usuario, get: ", error.message);
    res.render("signup", { error: "No se pudo registrar el usuario" });
  }
});

//Crear usuario
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    console.log("data", req.session);
    if (
      data.userMail === "adminCoder@coder.com" &&
      data.userPass === "adminCod3r123"
    ) {
      data.userRole = "admin";
    }
    const result = await userService.getUserByMail(data.userMail);
    if (!result) {
      await userService.addUser(data);
      req.session.userMail = data.userMail;
      const user = await userService.getUserByMail(data.userMail);
      res.render("profile", { user });
    } else {
      res.render("signup", {
        error: "El mail ingresado ya esta registrado", //verificar
      });
    }
  } catch (error) {
    console.log("registrar usuario, error: ", error.message);
    res.render("signup", {
      error: "No se pudo registrar el usuario", //verificar
    });
  }
});

//Iniciar session
router.post("/login", async (req, res) => {
  try {
    const loginForm = req.body;
    const user = await userService.getUserByMail(loginForm.userMail);
    if (!user) {
      return res.render("login", {
        error: `${loginForm.userMail} no se encuentra registrado`,
      });
    }
    if (loginForm.userPass === user.userPass) {
      req.session.userMail = user.userMail;
      console.log(req.session);
      res.render("home", { user });
    } else {
      res.render("login", {
        error: `Algunos de los datos ingresados no son validos`,
      });
    }
  } catch (error) {
    res.render("login", { error: "No se pudo iniciar session" });
  }
});

//Actualizar usuario
//Crear usuario
router.post("/update", async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log("ROUTES ID", userId);
    const newData = req.body;
    console.log("routes data", newData);
    // {req.body.userName,req.body.userPass,req.body.userMail,req.body.userAge,req.body.userCountry}
    const user = await userService.updateUser(userId, newData);
    res.render("profile", { user });
  } catch (error) {
    res.render("signup", { error: "No se pudo registrar el usuario" });
  }
});

//eliminar session
router.get("/logout", (req, res) => {
  if (req.session.userMail) {
    console.log("destroy", req.session);
    req.session.destroy((err) => {
      if (err)
        return res.render("profile", {
          error: "No se ha podido finalizar la sesion",
        });
      res.render("login", { message: "Sesion finalizada" });
    });
  } else {
    res.render("login", { message: "Aun no ha iniciado sesion" });
  }
});

// router.get("/login", async (req, res) => {
//   const loginName = "pablo";
//   const loginPass = "090909";
//   console.log("GETTT SESSION", req.session);
//   if (req.session.name === loginName && req.session.pass === loginPass) {
//     res.render("login");
//   } else {
//     res.send("login Failed!");
//   }
// });

router.get("/login/cookie-signed", async (req, res) => {
  console.log("signed", req.signedCookies); // traemos las cookies
  res
    .cookie(
      "signed-cookie",
      { sitio: "productos.com", type: "sports" },
      { signed: true }
    )
    .render("login");
});

//eliminar session
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send("No se pudo cerrar la sesion");
    res.send("sesion finalizada");
  });
});

export { router as sessionRouter };
