class ProductManager {
    constructor(){
      this.path = 'products.json'
      this.products = [];
      this.id = 0;
    }
    addProduct(title, description, price, thumbnail, code, stock){
      // Validación para todos los campos obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error ('Error: Todos los campos son obligatorios.');
        return;
      }
      const existingProduct = this.products.find((product) => product.code === code)
      //Validación 
      if (existingProduct){
        console.error (`Error: Ya existe un producto con el código ${code}`);
        return;
      }
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
      this.products.push(newProduct);
      console.log(`Producto agregado con éxito. Nuevo Producto: ${JSON.stringify(newProduct)}`)
    }
    getProducts(){
      return console.log(this.products);
    }
    getProductById(id){
      const product = this.products.find((product) => product.id === id);
      if (!product) {
        console.error("Error: Producto no encontrado");
        return;
      }
      return console.log(product);
    }
}
  //Testing de Entrega
  const productManager = new ProductManager();
  productManager.getProducts(); //Llamo al array que está vacío.
  productManager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);//Agrego un producto.
  productManager.getProducts();//Llamo neuvamente al array, esta vez tiene el producto agregado.
  productManager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);//Intento agregar nuevamente el mismo producto y da error.
  productManager.getProductById(1);//Busco el producto por su id y lo encuentra.
  productManager.getProductById(2);//Busco un producto que no existe y me da error.