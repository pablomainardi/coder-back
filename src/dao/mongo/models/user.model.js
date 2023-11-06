import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  userPass: {
    type: String,
    require: true,
  },
  userMail: {
    type: String,
    require: true,
  },
  userAge: {
    type: Number,
    require: true,
  },
  userCountry: {
    type: String,
    require: true,
  },
  userRole: {
    type: String,
    default: "usuario",
  },
});

export const userModel = mongoose.model(userCollection, userSchema);
