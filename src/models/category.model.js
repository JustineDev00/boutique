import { DataManager } from "../helpers/dataManager.helper";
import { BaseModel } from "./baseModel.model";

export class Category extends BaseModel{

    title = "";
    description = "";
    image = "";

    constructor(props){
        super(props);
        this.assign(props);
    }

    getProductList(){
        const dataManager = new DataManager();
        return dataManager.getAll("product").filter(product => product.category_id == this.id);
    }

    

}