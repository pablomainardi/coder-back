import { ProductManager } from "./prodManager.js";
import { CartManager } from "./cartManager.js";

export const prodService = new ProductManager("../src/files/products.json");
export const cartService = new CartManager("../src/files/carts.json");
