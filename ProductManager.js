class ProductManager {
    products = [];
    id = 0;
    constructor(id, title, description, price, thumbnail, code, stock){
      this.id = id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
    getProducts() {
      return console.log('Productos:', this.products);
    }
    newId() {
      if (this.products.find((product) => product.id !== 0)){
        this.id++
      } else {
        this.id = 1
      }
      return this.id
    }
    addProduct(title, description, price, thumbnail, code, stock) {
      const id = this.newId();
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Error: todos los campos son obligatorios');
      } else if (this.products.some((product) => product.code === code)) {
        console.error('Error: el código de producto ya existe');
      } else {
        const product = new ProductManager(id, title, description, price, thumbnail, code, stock);
        this.products.push(product);
        console.log(product);
      }
    }
    getProductById(id) {
      let product = this.products.find((product) => product.id === id)
      console.log(product ? product : "Not found")
    }
  }
  
  //Testing de Entrega
  const pm = new ProductManager();
  pm.getProducts(); //Llamo al array que está vacío.
  pm.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);//Agrego un producto.
  pm.getProducts();//Llamo neuvamente al array, esta vez tiene el producto agregado.
  pm.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);//Intento agregar nuevamente el mismo producto y da error.
  pm.getProductById(1);//Busco el producto por su id y lo encuentra.
  pm.getProductById(2);//Busco un producto que no existe y me da error.