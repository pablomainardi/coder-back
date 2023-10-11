import { chatModel } from "./models/chat.model.js";

export class ChatManagerMongo {
  constructor() {
    this.model = chatModel;
  }
  //mostrar historial
  async getHistoryChat() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      console.log("getHistoryChat", error.message);
      throw new Error("No se pudo cargar el historial del chat");
    }
  }

  //agregar mensaje
  async addChat(msgSend) {
    try {
      const result = await this.model.create(msgSend);
      return result;
    } catch (error) {
      console.log("msgSend", error.message);
      throw new Error("No se pudo enviar el mensaje");
    }
  }
}
