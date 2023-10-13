import { cartsService } from "../index.js";
import { cartsModel } from "./models/carts.model.js";
import { productsModel } from "./models/products.model.js";

// let lastCartId = [];

export class CartsManagerMongo {
  constructor() {
    this.model = cartsModel;
  }

  //metodo para agregar un carrito
  async createCart(newCart) {
    try {
      console.log("Carro CREADO");
      const result = await this.model.create(newCart);
      // const findLastCart = await this.model.find(); //traemos todos los carts
      // let lastCart = findLastCart[findLastCart.length - 1]; //buscamos el ultimo cart
      // lastCart._id = lastCartId; // guardamos el _id del ultimo cart
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
      const existingProductIndex = cart.carts.findIndex(
        (product) => product.productId.toString() === pid.toString()
      );

      if (existingProductIndex !== -1) {
        cart.carts[existingProductIndex].quantity += 1;
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
      const result = await this.model.find().populate("carts.productId");
      console.log(result);
      return result;
    } catch (error) {
      console.log("getAllCarts", error.message);
      throw new Error("No se pudo cargar todos los carros");
    }
  }
}
