import { ProductManager } from "./prodManager.js";
import { CartManager } from "./cartManager.js";
import { __dirname } from "../utils.js";
import path from "path";
import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js";
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";

export const prodService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const chatService = new ChatManagerMongo();

// export const prodService = new ProductManager(
//   path.join(__dirname, "/files/products.json")
// );
// export const cartService = new CartManager(
//   path.join(__dirname, "/files/carts.json")
// );
