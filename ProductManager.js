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
//Funciones
const products = [];
function getProducts() {
    console.log(products);
}

function addProducts(id, title, description, price, thumbnail, code, stock){
    
    products.push(new ProductManager(id, title, description, price, thumbnail, code, stock))
}
function getProductById{

}
//Programa
getProducts();
addProducts('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);
getProducts();