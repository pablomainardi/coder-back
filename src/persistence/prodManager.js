import fs from "fs";
export class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  //existe el archivo?
  fileExist() {
    return fs.existsSync(this.path);
  }
  //sino existe lo crea
  async ensureFileExists() {
    try {
      if (!this.fileExist()) {
        await fs.promises.writeFile(this.path, "[]");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //agregar un producto
  //?title=ejemplo7&description=ejemp6&code=107&price=600&status=true&stock=7&category=caza&thumbnails=caza107
  async addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) {
    await this.ensureFileExists();
    try {
      const allProducts = await fs.promises.readFile(this.path, "utf-8");
      const allProductsJson = JSON.parse(allProducts);
      const listId = allProductsJson.map((i) => i.id);

      let maxId = Math.max(...listId);

      if (
        !title ||
        !description ||
        !code ||
        !price ||
        !status ||
        !stock ||
        !category
      ) {
        console.log("Todos los campos son obligatorios");
      } else {
        const prod = {
          id: maxId + 1,
          title,
          description,
          code,
          price,
          status: true,
          stock,
          category,
          thumbnails,
        };
        let existCode = allProductsJson.some((cod) => cod.code === code);

        if (existCode) {
          console.log(
            `No se puede agregar el producto. CODE ${code} existente`
          );
        } else {
          allProductsJson.push(prod);
          console.log(`Se ha agregado producto: ${prod.title}`);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(allProductsJson, null, "\t")
          );
        }
      }
    } catch (error) {
      console.log("Error al Agregar producto - ", error.message);
      throw error;
    }
  }

  //trae todos los productos
  async getProducts() {
    await this.ensureFileExists();
    try {
      if (this.fileExist()) {
        const allProducts = await fs.promises.readFile(this.path, "utf-8");
        const allProductsJson = JSON.parse(allProducts);
        let lengthArray = allProductsJson.length;
        if (!lengthArray) {
          return `No se han encontrado productos`;
        } else {
          return allProductsJson;
        }
      } else {
        throw console.log(
          "No se ha creado un archivo aún, debe agregar productos primero."
        );
      }
    } catch (error) {
      console.log("Error al leer el listado de los productos");
    }
  }

  //trae el producto por ID
  async getProductById(i) {
    await this.ensureFileExists(); //verificamos si existe el archivo
    try {
      const allProducts = await fs.promises.readFile(this.path, "utf-8");
      const allProductsJson = JSON.parse(allProducts);
      let findId = allProductsJson.find((p) => p.id === i);
      if (findId) {
        return findId;
      } else {
        return `Not Found, no se encuentra el id ${i}`;
      }
    } catch (error) {
      console.log("Error - ", error.message);
    }
  }
  //ver si sacar la verificacion por id
  //actualiza un producto por ID
  async updateProduct(
    i,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) {
    await this.ensureFileExists();
    try {
      const allProducts = await fs.promises.readFile(this.path, "utf-8");
      const allProductsJson = JSON.parse(allProducts);
      let findId = allProductsJson.find((p) => p.id === i);
      console.log(findId);
      if (findId) {
        const prod = {
          id: i,
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnails,
        };

        const indice = allProductsJson.findIndex((elm) => elm.id === i);

        allProductsJson[indice] = prod;

        console.log(`Se ha Actualizado el producto con el ID: ${prod.id}`);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(allProductsJson, null, "\t")
        );
      } else {
        console.log(`No existe Producto con el ID : ${i}`);
      }
    } catch (error) {
      console.log("Error - ", error.message);
    }
  }

  //elimina un producto por ID
  async deleteProduct(i) {
    await this.ensureFileExists();
    try {
      const allProducts = await fs.promises.readFile(this.path, "utf-8");
      const allProductsJson = JSON.parse(allProducts);
      let findId = allProductsJson.find((p) => p.id === i);
      if (findId) {
        const indice = allProductsJson.findIndex((elm) => elm.id === i);
        allProductsJson.splice([indice], 1);
        console.log(`Se ha Eliminado el producto con el ID: ${i}`);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(allProductsJson, null, "\t")
        );
      } else {
        console.log(`No existe Producto con el ID : ${i}`);
      }
    } catch (error) {
      console.log("Error - ", error.message);
    }
  }
}

// const opProducts = async () => {
//   try {
//     const producto1 = new ProductManager
//     ("./products.json");

//     // console.log("---ARREGLO VACIO---");
//     // producto1.getProducts();
//     // producto1.addProduct("ejemplo1", "ejemp1", 100, "eje1", 110, 1);
//     // console.log("---AGREGADO SIN TODOS LOS CAMPOS---");
//     // producto1.addProduct("ejemploc", "ejempc", 200, 220, 2);
//     // console.log("---AGREGADO CON MISMO CODE---");
//     // producto1.addProduct("ejemplo9", "ejemp9", 400, "eje9", 110, 3);
//     // console.log("---AGREGADO DE PRODUCTOS---");
//     // producto1.addProduct("ejemplo2", "ejemp2", 200, "eje2", 220, 2);
//     // producto1.addProduct("ejemplo3", "ejemp3", 300, "eje3", 330, 3);
//     // producto1.addProduct("ejemplo4", "ejemp4", 400, "eje4", 440, 4);
//     // producto1.addProduct("ejemplo5", "ejemp5", 500, "eje5", 550, 5);
//     // console.log("---LISTADO DE PRODUCTOS---");
//     // producto1.getProducts();
//     // console.log("---BUSQUEDA POR ID---");
//     // producto1.getProductById(7);
//     // producto1.getProductById(2);
//     // producto1.getProducts();
//     // console.log("---UPDATE POR ID---");
//     // producto1.updateProduct(5, "ejemplo10", "ejemp9", 900, "eje9", 990, 9);
//     // console.log("---ELIMINAR POR ID---");
//     // producto1.deleteProduct(5);
//     // producto1.deleteProduct(7);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// opProducts();
