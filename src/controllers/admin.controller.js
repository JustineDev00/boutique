import { DataManager } from "../helpers/dataManager.helper";
// import { AdminProductsView } from "../views/admin/products.view.js";
// import { AdminCategoriesView } from "../views/admin/categories.view.js";

export class AdminController{
    
    constructor(){
        console.log(this.constructor.name);
    }

    products = async (params) => {
        const dm = new DataManager();
        const products = dm.getAll("product");
        const {AdminProductsView} = await import('../views/admin/products.view.js');
        const view = new AdminProductsView({products})
        const content = view.render();
        return content;
    }

    categories = async (params) => {
        const dm = new DataManager();
        const categories = dm.getAll("category");
        const product_1 = dm.getOne("product", 1);
        const {AdminCategoriesView} = await import('../views/admin/categories.view.js');
        const view = new AdminCategoriesView({categories, product_1})
        const content = view.render();
        return content;
    }

    category = async (params) => {
        const id = params[0];
        return "category detail " + id;
    }

    product = async (params) => {
        const id = params[0];
        return "product detail " + id;
    }
}