//Clases
class ProductManager {
    constructor(id, title, description, price, thumbnail, code, stock){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
//Variables globales
const products = [];
let id = 0;
//Funciones
function getProducts() {
    console.log('Productos:', products);
}
function newId() {
    if (products.find((product) => product.id !== 0)){
       id++
    }else{
        id = 1
    }
    return id
}

function addProduct(id, title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Error: todos los campos son obligatorios');
    }else if (products.some((product) => product.code === code)) {
        console.error('Error: el código de producto ya existe');
    }else{
        const product = new ProductManager(id, title, description, price, thumbnail, code, stock);
        products.push(product);
        console.log(product);
    }

}

function getProductById(id) {
    let product = products.find((product) => product.id === id)
    console.log(product ? product : "Not found")
}

//Testing de Entrega
getProducts(); //Llamo al array que está vacío.
addProduct(newId(),'producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);//Agrego un producto.
getProducts();//Llamo neuvamente al array, esta vez tiene el producto agregado.
addProduct(newId(),'producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);//Intento agregar nuevamente el mismo producto y da error.
getProductById(1);//Busco el producto por su id y lo encuentra.
getProductById(2);//Busco un producto que no existe y me da error.