import { userModel } from "./models/user.model.js";

export class UserManagerMongo {
  constructor() {
    this.model = userModel;
  }
  //Trae todos los usuarios
  async getUsers() {
    try {
      const result = await this.model.find().lean();
      return result;
    } catch (error) {
      console.log("getUser", error.message);
      throw new Error("No se pudieron cargar los usuarios");
    }
  }

  //buscar un usuario
  async getUserByMail(mail) {
    try {
      const result = await this.model.findOne({ userMail: mail }).lean();
      return result;
    } catch (error) {
      console.log("getUserByMail", error.message);
      throw new Error("No se pudo cargar los usuarios");
    }
  }

  //agrega un nuevo usuario
  async addUser(dataUser) {
    try {
      const result = await this.model.create(dataUser);
      return result;
    } catch (error) {
      console.log("addUser", error.message);
      throw new Error("No se pudo crear el usuario");
    }
  }

  //elimina un usuario por id
  async delUser(userId) {
    try {
      const result = await this.model.findByIdAndDelete(userId);
      return result;
    } catch (error) {
      console.log("delUser", error.message);
      throw new Error("No se pudo eliminar el usuario");
    }
  }

  //actualiza un usuario por id
  async updateUser(userId, dataUser) {
    try {
      console.log("userId", userId);
      console.log("userData", dataUser);
      const result = await this.model
        .findByIdAndUpdate(userId, dataUser, { new: true })
        .lean();
      return result;
    } catch (error) {
      console.log("updateUser", error.message);
      throw new Error("No se pudo actualizar el usuario");
    }
  }
}
