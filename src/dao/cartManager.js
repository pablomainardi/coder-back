import fs from "fs";
export class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  fileExist() {
    return fs.existsSync(this.path);
  }
  async ensureFileExists() {
    try {
      if (!this.fileExist()) {
        await fs.promises.writeFile(this.path, "[]");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //metodo para agregar un carrito ( verificar como establecer en 1 el id cuando esta vacio el array)
  async createCart() {
    await this.ensureFileExists();
    try {
      const allCarts = await fs.promises.readFile(this.path, "utf-8");
      const allCartsJson = JSON.parse(allCarts);

      const listId = allCartsJson.map((i) => i.id);

      let maxId = Math.max(...listId);

      const cart = {
        id: maxId + 1,
        products: [],
      };

      allCartsJson.push(cart);
      console.log(`Se ha creado el carrito`);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(allCartsJson, null, "\t")
      );
    } catch (error) {
      console.log("Error al crear el carrito", error.message);
      throw error;
    }
  }

  //metodo para agregar un producto por id  al carrito seleccionado por id
  async addCart(cid, pid) {
    await this.ensureFileExists();
    try {
      const allCarts = await fs.promises.readFile(this.path, "utf-8");
      const allCartsJson = JSON.parse(allCarts);

      let thisCart = allCartsJson.find((p) => p.id === cid);

      if (thisCart) {
        const existProduct = thisCart.products.find(
          (product) => product.product === pid
        );
        if (existProduct) {
          existProduct.quantity += 1;
        } else {
          const prod = {
            product: pid,
            quantity: 1,
          };
          thisCart.products.push(prod);
        }

        console.log(`Se ha agregado el producto al carrito`);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(allCartsJson, null, "\t")
        );
      } else {
        return `Not Found, no se encuentra el id/carrito ${i}`;
      }
    } catch (error) {
      console.log("Error al Agregar producto", error.message);
      throw error;
    }
  }

  //trae productos del carro con el id solicitado
  async getProductByCartId(i) {
    await this.ensureFileExists();
    try {
      const allProductsCartId = await fs.promises.readFile(this.path, "utf-8");
      const allProductsCartIdJson = JSON.parse(allProductsCartId);
      let findId = allProductsCartIdJson.find((p) => p.id === i);
      if (findId) {
        return findId.products;
      } else {
        return `Not Found, no se encuentra el id ${i}`;
      }
      // findId
      //   ? console.log("Producto Encontrado:", findId)
      //   : console.log(`Not Found, no se encuentra el id ${i}`);
    } catch (error) {
      console.log("Error - Id Carrito no se puede procesar ", error.message);
    }
  }
}
