import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
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
    index: true,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    index: true,
    type: String,
    require: true,
    enums: [
      "Fútbol",
      "Tenis",
      "Boxeo",
      "Fitness",
      "Natación",
      "Baloncesto",
      "Ciclismo",
      "Atletismo",
    ],
  },
  thumbnails: String,
});

productSchema.plugin(mongoosePaginate);
export const productsModel = mongoose.model(productCollection, productSchema);
