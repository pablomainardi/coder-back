import { chatModel } from "./models/chat.model.js";

export class ChatManagerMongo {
  constructor() {
    this.model = chatModel;
  }
}
