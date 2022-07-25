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

    setProp(key, value){
        if(key == "id") return this; //pour interdire la modification de l'id
        this[key] = value;
        return this; //pour permettre le chainage des méthodes sur l'objet
    }

}