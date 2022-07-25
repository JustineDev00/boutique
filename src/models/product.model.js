import { DataManager } from "../helpers/dataManager.helper";
import { BaseModel } from "./baseModel.model";

export class Product extends BaseModel{

    title = "";
    description = ""; 
    image = ""; 
    price = -1;
    category_id = -1;

    constructor(props){
        super(props);
        this.assign(props);
    }

    getCategory(){
        const dataManager = new DataManager();
        return dataManager.getOne("category", this.category_id);
    }

}