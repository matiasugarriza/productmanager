const fs = require('fs')
class ProductManager {
  constructor() {
    this.path = 'Products.json'
    this.id = 0;
  }
  async getProducts() {
    try {
      let readFile = await fs.promises.readFile(this.path, 'utf-8')
      console.log(`Productos: ${readFile}`)
    } catch (err) {
      fs.promises.writeFile(this.path, JSON.stringify([]), 'utf-8')
      this.getProducts()
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
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
      // Validación para todos los campos obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Error: Todos los campos son obligatorios.');
        return;
      }
      let readFile = await fs.promises.readFile(this.path, 'utf-8')
      let readProducts = JSON.parse(readFile)
      const existingProduct = readProducts.find((product) => product.code === code)
      //Validación 
      if (existingProduct) {
        console.error(`Error: Ya existe un producto con el código ${code}`);
        return;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(newProduct), 'utf-8')
      console.log(`Producto agregado con éxito. Nuevo Producto: ${JSON.stringify(newProduct)}`)
    } catch (err) {
      console.error(`Error al guardar producto`)
    }
  }

  /*   async getProductById(id){
      try{
        let readFile = await fs.promises.readFile(this.path, 'utf-8')
        let product = readFile.find((product) => product.id === id);
      if (!product) {
        console.error("Error: Producto no encontrado");
        return;
      }
      return console.log(product);
    } catch(err){
      console.error("Error al buscar el producto");
    }
    } */
}
//Testing de Entrega
const productManager = new ProductManager("./Productos.json");
//productManager.getProducts(); //Llamo al array que está vacío.
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);//Agrego un producto.
//productManager.getProducts();//Llamo neuvamente al array, esta vez tiene el producto agregado.
//productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);//Intento agregar nuevamente el mismo producto y da error.
//productManager.getProductById(1);//Busco el producto por su id y lo encuentra.
//productManager.getProductById(2);//Busco un producto que no existe y me da error. */

