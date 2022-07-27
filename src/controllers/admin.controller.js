import { DataManager } from "../helpers/dataManager.helper";
import { HomeViewIndex } from "../views/admin/categories.view.js";

export class AdminController{
    
    constructor(){
        console.log(this.constructor.name);
    }

    products = (params) => {
        return "Liste des produits";
    }

    categories = (params) => {
        const dm = new DataManager();
        const categories = dm.getAll("category");
        const view = new HomeViewIndex({categories})
        const content = view.render();
        return content;
    }
}