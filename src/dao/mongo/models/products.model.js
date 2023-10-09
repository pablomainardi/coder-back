import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
    enums: ["Deportes", "Ropa", "Pesca"],
  },
  thumbnails: String,
});

export const productsModel = mongoose.model(productCollection, productSchema);
