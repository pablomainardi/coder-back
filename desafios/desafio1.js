class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const prod = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const prodExist = this.products.find((p) => p.code === prod.code);
    if (!prodExist) {
      if (this.products.length === 0) {
        prod.id = 1;
      } else {
        prod.id = this.products[this.products.length - 1].id + 1;
      }
      this.products.push(prod);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const prodById = this.products.find((p) => p.id === id);
    if (prodById) {
      return prodById;
    } else {
      console.log("Not found");
    }
  }
}
