import mongoose from "mongoose";

const chatCollection = "chats";

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

export const chatModel = mongoose.model(chatCollection, chatSchema);
