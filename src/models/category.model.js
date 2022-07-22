import { DataManager } from "../helpers/dataManager.helper";

export class Category{

    id = -1;
    title = "";
    description = "";
    image = "";

    constructor(props){
        for(const key in props){ 
            if(!this.hasOwnProperty(key)){
                delete props[key];
            }
        }
        Object.assign(this, props);
    }

    getProductList(){
        const dataManager = new DataManager();
        return dataManager.getAll("product").filter(product => product.category_id == this.id);
    }

}