import { cartsModel } from "./models/carts.model.js";

export class CartsManagerMongo {
  constructor() {
    this.model = cartsModel;
  }
  //metodo para agregar un carrito
  async createCart(newCart) {
    try {
      const result = await this.model.create(newCart);
      return result;
    } catch (error) {
      console.log("createCart", error.message);
      throw new Error("No se pudo crear carro");
    }
  }
  //metodo para agregar un producto por id  al carrito seleccionado por id
  async addCart(cid, pid) {}
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
}
