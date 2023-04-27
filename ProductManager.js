const fs = require('fs')
class ProductManager {
  constructor(path) {
    this.path = path
    this.id = 0
  }
  async getProducts() {
    if (fs.existsSync(this.path)) {
      let readFile = await fs.promises.readFile(this.path, "utf-8")
      console.log(`Productos: ${readFile}`)
    } else {
      fs.promises.writeFile(this.path, JSON.stringify([]), "utf-8")
      let readFile = await fs.promises.readFile(this.path, "utf-8")
      console.log(`Productos: ${readFile}`)
    }
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, JSON.stringify([]), "utf-8")
    }
    let readFile = await fs.promises.readFile(this.path, "utf-8")
    let readProduct = JSON.parse(readFile)
    //Id autoincremental
    this.id++
    //Se agrega un nuevo producto
    const newProduct = {
      id: this.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    const existingProduct = readProduct.find((product) => product.code === code)
    if (existingProduct) {
      console.error(`Error: Ya existe un producto con el código ${code}`)
    } else {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Error: Todos los campos son obligatorios.');
      } else {
        readProduct.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(readProduct), "utf-8")
        console.log(await fs.promises.readFile(this.path, "utf-8"))
      }
    }
  }
  async getProductById(id, title, description, price, thumbnail, code, stock) {
    let readFile = await fs.promises.readFile(this.path, "utf-8")
    let readProduct = JSON.parse(readFile)
    const idProduct = readProduct.find((product) => product.id === id)
    if (idProduct) {
      console.log(idProduct)
    } else {
      console.error('No existe ningún producto con ese ID')
    }
  }
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    let readFile = await fs.promises.readFile(this.path, "utf-8")
    let readProduct = JSON.parse(readFile)
    const idProduct = readProduct.find((product) => product.id === id)
    const indexProduct = readProduct.indexOf(idProduct)
    const editedProduct = { id, title, description, price, thumbnail, code, stock }
    if (indexProduct > -1) {
      readProduct.splice(indexProduct, 1, editedProduct)
      await fs.promises.writeFile(this.path, JSON.stringify(readProduct), "utf-8")
    }
  }
  async deleteProduct(id) {
    let readFile = await fs.promises.readFile(this.path, "utf-8")
    let readProduct = JSON.parse(readFile)
    const idProduct = readProduct.find((product) => product.id === id)
    const indexProduct = readProduct.indexOf(idProduct)
    if (indexProduct > -1) {
      readProduct.splice(indexProduct, 1)
      await fs.promises.writeFile(this.path, JSON.stringify(readProduct), "utf-8")
      console.log('Producto eliminado con éxito')
    } else {
      console.error('No existe ningún producto con ese ID')
    }
  }
}
