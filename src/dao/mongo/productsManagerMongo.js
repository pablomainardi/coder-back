import { productsModel } from "./models/products.model.js";

export class ProductsManagerMongo {
  constructor() {
    this.model = productsModel;
  }

  //trae todos los productos
  async getProducts() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      console.log("getProducts", error.message);
      throw new Error("No se pudo cargar los productos");
    }
  }

  // VERIFICAR PAGINACION

  // async getProductsPaginate(pageNumber) {
  //   try {
  //     const limit = 15; // Número de productos por página
  //     const result = await this.model.paginate(
  //       {},
  //       { limit, pageNumber },
  //       { lean: true }
  //     );
  //     console.log(result);
  //     return result;
  //   } catch (error) {
  //     // console.log("getProducts", error.message);
  //     throw new Error("No se pudo cargar los productos");
  //   }
  // }

  //  PAGINACION
  async getProductsPaginate(pageNumber = 1, limit, order = "asc") {
    try {
      const skip = (pageNumber - 1) * limit;
      let whithOrder = {};
      if (order === "asc") {
        whithOrder = { price: 1 };
      } else if (order === "desc") {
        whithOrder = { price: -1 };
      }
      const result = await this.model
        .find({})
        .sort(whithOrder)
        .skip(skip)
        .limit(limit)
        .lean();
      // console.log("resullttttttttttttttttt", result);
      return result;
    } catch (error) {
      console.log("getProductsPaginate", error.message);
      throw new Error("No se pudo cargar los productos de forma correcta");
    }
  }

  //agregar un producto
  async addProduct(productData) {
    try {
      const result = await this.model.create(productData);
      return result;
    } catch (error) {
      console.log("addProduct", error.message);
      throw new Error("No se pudo crear/agregar producto");
    }
  }

  //trae el producto por ID
  async getProductById(productId) {
    try {
      const result = await this.model.findById(productId);
      return result;
    } catch (error) {
      console.log("getProductById", error.message);
      throw new Error("No se pudo cargar el producto por ID");
    }
  }
  //actualiza un producto por ID
  async updateProduct(productId, newProductData) {
    try {
      const result = await this.model.findByIdAndUpdate(
        productId,
        newProductData,
        { new: true }
      );
      if (!result) {
        throw new Error("No se encontro ID del producto a actualizar");
      }
      return result;
    } catch (error) {
      console.log("updateProduct", error.message);
      throw new Error("No se pudo actualizar el producto");
    }
  }
  //elimina un producto por ID
  async deleteProduct(productId) {
    try {
      const result = await this.model.findByIdAndDelete(productId);
      if (!result) {
        throw new Error("No se encontro ID del producto a eliminar");
      }
      return result;
    } catch (error) {
      console.log("deleteProduct", error.message);
      throw new Error("No se pudo eliminar el producto");
    }
  }
}
