import { ProductManager } from "./prodManager.js";
import { CartManager } from "./cartManager.js";
import { __dirname } from "../utils.js";
import path from "path";

export const prodService = new ProductManager(
  path.join(__dirname, "/files/products.json")
);
export const cartService = new CartManager(
  path.join(__dirname, "/files/carts.json")
);
