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
        (p) => p.productId.toString() === pid.toString()
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
  async getCartById(i) {
    try {
      const result = await this.model.findById(i).populate("carts.productId");
      if (!result) {
        throw new Error(`El carrito con el ID: ${i} no existe`);
      }
      return result;
    } catch (error) {
      console.log("getCartById", error.message);
      throw new Error("No se pudo cargar el carro por ID");
    }
  }

  //trae productos todos los carros
  async getAllCarts() {
    try {
      const result = await this.model.find().populate("carts.productId");
      // console.log(result);
      return result;
    } catch (error) {
      console.log("getAllCarts", error.message);
      throw new Error("No se pudo cargar todos los carros");
    }
  }

  //trae productos todos los carros
  async delCartById(i) {
    try {
      const result = await this.model.findByIdAndDelete(i);
      console.log(result);
      return result;
    } catch (error) {
      console.log("delCartById", error.message);
      throw new Error("No se pudo eliminar el carrito por id");
    }
  }

  //eliminar un producto dentro de un carrito por ID
  async delProdByIdInCartById(cid, pid) {
    try {
      const cart = await this.model.findByIdAndUpdate(
        cid,
        { $pull: { carts: { productId: pid } } },
        { new: true }
      );
      if (!cart) {
        throw new Error(`El carrito con el ID: ${cid} no existe`);
      }
      return cart;
    } catch (error) {
      console.log("delProdByIdInCartById", error.message);
      throw new Error("No se pudo eliminar el producto del carrito por ID");
    }
  }

  // agregar cantidad deseada al producto segun id , del carro segun id
  async addQuantityProd(cid, pid, qty) {
    try {
      const cart = await this.model.findById(cid);
      // console.log("Cart", cart);
      const existingProductIndex = cart.carts.findIndex(
        (p) => p.productId.toString() === pid.toString()
      );
      // console.log("existingProductIndex", existingProductIndex);

      if (existingProductIndex !== -1) {
        cart.carts[existingProductIndex].quantity += +qty;
      } else {
        cart.carts.push({ productId: pid, quantity: +qty });
        // console.log("se agrego NAV", qty);
      }
      await cart.save(); //guarda en la bd los cambios realizados
      console.log(`Se agregaron ${qty} unidades del producto ${pid} al carro`);
    } catch (error) {
      console.log("addQuantityProd", error.message);
      throw new Error("No se pudo agregar las unidades al carro");
    }
  }
}
