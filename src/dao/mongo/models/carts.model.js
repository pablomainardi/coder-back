import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  //CON PUPULACION --- find().populate("cartsSchema.productId")
  carts: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          require: true,
        },
        _id: false,
      },
    ],
    default: [],

    //SIN POPULACION ---
    // carts: {
    //   type: [
    //     {
    //       productId: String,
    //       quantity: {
    //         type: Number,
    //         require: true,
    //       },
    //     },
    //   ],
    //   default: [],
  },
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
