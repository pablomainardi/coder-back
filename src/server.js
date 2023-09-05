import express from "express";
import { ProductManager } from "./persistence/prodManager.js";

// console.log(ProductManager);
const managerProdServices = new ProductManager("./files/products.json");
// console.log(managerProdServices);

const port = 8080;

const server = express();

const allProducts = await managerProdServices.getProducts();
// const delProducts = await managerProdServices.deleteProduct();
// await managerProdServices.getProductById();

server.listen(port, () => console.log("Servidor Funcionando"));

server.use(express.urlencoded({ extended: true }));

server.get("/login", async (req, res) => {
  res.send("BIENVENIDOS");
});

server //Todos los productos
  .get("/products", async (req, res) => {
    try {
      const { limit } = req.query;
      const numLimit = Number(limit);
      if (limit) {
        const allProdLimit = allProducts.slice(0, numLimit);
        res.send(allProdLimit);
      } else {
        res.send(allProducts);
      }
    } catch (error) {
      res.send(error.message);
    }
  });

server // Para buscar producto por ID
  .get("/products/:idProd", async (req, res) => {
    try {
      const prodId = Number(req.params.idProd);
      const prodFindId = await managerProdServices.getProductById(prodId);
      if (prodFindId) {
        res.send(prodFindId);
      } else {
        res.send("El producto NOO existe");
      }
    } catch (error) {
      res.send(error.message);
    }
  });

server // Para eliminar producto por ID
  .get("/products/del/:idProd", async (req, res) => {
    try {
      const prodId = Number(req.params.idProd);
      const prodFind = allProducts.find((p) => p.id === prodId);
      if (prodFind) {
        await managerProdServices.deleteProduct(prodId);
        const updAllProd = await managerProdServices.getProducts();
        res.send(updAllProd);
      } else {
        res.send("El producto NOO existe");
      }
    } catch (error) {
      res.send(error.message);
    }
  });
//

// METODO EN REPARACION _____________
// server  // Para ACTUALIZAR un producto por id, agregando los campos a modificar
// .post("/products/update", async (req, res) => {
//   try {
//     const i = Number(req.query.i);
//     const title = req.body.title;
//     const description = req.body.description;
//     const price = Number(req.body.price);
//     const thumbnail = req.body.thumbnail;
//     const code = Number(req.body.code);
//     const stock = Number(req.body.stock);

//   // console.log((i, title, description, price, thumbnail, code, stock))
//     await managerProdServices.updateProduct(i, title, description, price, thumbnail, code, stock);
//     // console.log(`Se ha actualizado el producto con ID ${i}`);
//               const updAllProd = await managerProdServices.getProducts();
//                res.send(updAllProd);
//   } catch (error) {
//     res.send(error.message);
//   }}
// )
// i=1&title=ejemplo6&description=ejemp6&price=600&thumbnail=eje6&code=660&stock=6

// server
// .get("/usuarios", (req, res) => {
//   res.send([
//     {
//       id: 1,
//       title: "ejemplo1",
//       description: "ejemp1",
//       price: 100,
//       thumbnail: "eje1",
//       code: 110,
//       stock: 1,
//     },
//   ]);
// });

// const prodName = [
//   { id: 1, title: "prod1" },
//   { id: 2, title: "prod2" },
//   { id: 3, title: "prod3" },
// ];

// /prod?title=prod1&id=1
// server
// .get("/producto", (req, res) => {
//   const title = req.query.title;
//   if (title) {
//     const result = prodName.filter((p) => p.title === title);
//     res.send(result);
//     console.log(req.query.title);
//     console.log(req.query);
//   } else {
//     res.send(prodName);
//   }
// });
