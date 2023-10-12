import { cartsService } from "../index.js";
import { cartsModel } from "./models/carts.model.js";
import { productsModel } from "./models/products.model.js";

export class CartsManagerMongo {
  constructor() {
    this.model = cartsModel;
  }
  //metodo para agregar un carrito
  async createCart() {
    try {
      const result = await this.model.create();
      return result;
    } catch (error) {
      console.log("createCart", error.message);
      throw new Error("No se pudo crear carro");
    }
  }
  //metodo para agregar un producto por id  al carrito seleccionado por id
  async addCart(cid, pid) {
    try {
      const cart = await this.model.findById(cid);
      const existingProduct = cart.carts.find(
        (product) => product.productId === pid
      );
      // Verificar si existe otro producto con el mismo id dentro del carrito
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.carts.push({ productId: pid, quantity: 1 });
      }
      await cart.save(); //guarda en la bd los cambios realizados
      console.log(`Se agregó el producto ${pid} al carro`);
    } catch (error) {
      console.log("addCart", error.message);
      throw new Error("No se pudo agregar al carro");
    }
  }

  //trae productos del carro con el id solicitado
  async getProductByCartId(i) {
    try {
      const result = await this.model.findById(i);
      return result;
    } catch (error) {
      console.log("getProductByCartId", error.message);
      throw new Error("No se pudo cargar el carro por ID");
    }
  }

  //trae productos todos los carros
  async getAllCarts() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      console.log("getAllCarts", error.message);
      throw new Error("No se pudo cargar todos los carros");
    }
  }
}
