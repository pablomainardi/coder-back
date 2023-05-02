class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
    }

    const prodExist = this.products.find((p) => p.code === code);
    if (prodExist) {
      console.log("Ya existe un producto con el mismo Code");
    }

    const prod = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: Math.floor(Math.random() * (10000 - 1)) + 1,
    };

    this.products.push(prod);
    return prod;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const prodById = this.products.find((p) => p.id === id);
    if (prodById) {
      return prodById;
    } else {
      console.log("Producto no encontrado");
    }
  }

  updateProduct(id, prop, valor) {
    const updateProd = this.products.findIndex((p) => p.id === id);
    if (updateProd >= 0) {
      if (prop !== "id") {
        this.products[updateProd][prop] = valor;
      } else {
        console.log("No se puede modificar el ID del producto");
      }
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);

    if (this.products.length === initialLength) {
      console.log("Producto no encontrado");
    } else {
      console.log(`Producto con id ${id} se eliminó`);
    }
  }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());

const nuevoProducto = productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
console.log(nuevoProducto);

console.log(productManager.getProducts());

const productoById = productManager.getProductById(nuevoProducto.id);
console.log(productoById);

productManager.updateProduct(nuevoProducto.id, "price", 300);
console.log(productManager.getProducts());

productManager.deleteProduct(nuevoProducto.id);
console.log(productManager.getProducts());
