import { Router } from "express";
import { prodService } from "../persistence/index.js";

const router = Router();

const allProducts = await prodService.getProducts();

// devuelve todos los productos
router.get("/", async (req, res) => {
  const products = await prodService.getProducts();
  res.json({ message: "Listado de Productos", products });
});

//devuelve el producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const getProdId = Number(req.params.pid);
    const product = await prodService.getProductById(getProdId);
    res.json({ message: `Producto con el ID ${getProdId}`, product });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//agregar un producto
//?title=ejemplo7&description=ejemp6&code=107&price=600&status=true&stock=7&category=caza&thumbnails=caza107
//?title=aaa&description=aaaa2&code=aaaa3&price=2&status=true&stock=4&category=futbol&thumbnails=fotos
router.post("/", async (req, res) => {
  try {
    const title = req.query.title;
    const description = req.query.description;
    const code = req.query.code;
    const price = Number(req.query.price);
    const status = req.query.status;
    const stock = Number(req.query.stock);
    const category = req.query.category;
    const thumbnails = req.query.thumbnails;

    await prodService.addProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    );
    const allProd = await prodService.getProducts();
    res.json(allProd);
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//actualiza producto por ID ---- enviar por body el objeto por su id
router.post("/:pid", async (req, res) => {
  try {
    const id = Number(req.params.pid);
    const title = req.body.title;
    const description = req.body.description;
    const code = req.body.code;
    const price = Number(req.body.price);
    const status = req.body.status;
    const stock = Number(req.body.stock);
    const category = req.body.category;
    const thumbnails = req.body.thumbnails;
    const updateProduct = await prodService.updateProduct(
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    );
    res.json(updateProduct);
  } catch (error) {
    res.json({ status: "error al actualizar", message: error.message });
  }
});

// Eliminar producto por ID
router.delete("/:idProd", async (req, res) => {
  try {
    const prodId = Number(req.params.idProd);
    const prodFind = allProducts.find((p) => p.id === prodId);
    if (prodFind) {
      await prodService.deleteProduct(prodId);
      const updAllProd = await prodService.getProducts();
      res.send(updAllProd);
    } else {
      res.send("No existe un producto con ese ID");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export { router as productsRouter };
