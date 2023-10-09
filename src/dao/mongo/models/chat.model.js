import mongoose from "mongoose";

const chatCollection = "chat";

const chatSchema = new mongoose.Schema({
  products: {
    type: [
      {
        productId: String,
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
    default: [],
  },
});

export const chatModel = mongoose.model(chatCollection, chatSchema);
