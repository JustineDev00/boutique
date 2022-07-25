import { DataManager } from "./helpers/dataManager.helper";
import { Category } from "./models/category.model";
import { Product } from "./models/product.model";

const dataManager = new DataManager(['category', 'product']);
// dataManager.initDataStorage();

//Tests des constructeurs des classes models
const categoryJsonData = {"id":1,"title":"vestibulum ante","description":"Mauris ullamcorper purus sit amet nulla.","image":"https://picsum.photos/1001/600/400"};
const category_1 = new Category(categoryJsonData);
console.log("constructeur Category", category_1);

const productJsonData = {"id":1,"title":"justo in","price":607.77,"description":"Maecenas ut massa quis augue luctus tincidunt.","image":"https://picsum.photos/1/600/400","category_id":1};
const product_1 = new Product(productJsonData);
console.log("constructeur Product", product_1);

//Tests des methodes getAll et getOne de la classe DataManager
const allCategories = dataManager.getAll("category");
console.log("get all categories", allCategories);
const allProducts = dataManager.getAll("product");
console.log("get all products", allProducts);

const category_2 = dataManager.getOne("category", 2);
console.log("get category 2", category_2);
const product_2 = dataManager.getOne("product", 2);
console.log("get product 2", product_2);

//Test de getCategory (classe Product)
const categoryOfProduct_2 = product_2.getCategory();
console.log("get category of product 2", categoryOfProduct_2);

//Test de getProductList (classe Category)
const allProductsOfCategory_2 = category_2.getProductList();
console.log("get all products of category 2", allProductsOfCategory_2);


//Test des méthode setProp des modèles (Category, Product) + méthode update de DataManager
category_2.setProp("title", "un nouveau titre")
    .setProp("description", "une nouvelle description")

dataManager.update(category_2);

product_2.setProp("price", 10);
dataManager.update(product_2);

console.log();