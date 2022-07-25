import { DataManager } from "../helpers/dataManager.helper";

export class Product{

    id = -1;
    title = "";
    description = ""; 
    image = ""; 
    price = -1;
    category_id = -1;

    constructor(props){
        for(const key in props){ 
            if(!this.hasOwnProperty(key)){
                delete props[key];
            }
        }
        Object.assign(this, props);
    }

    getCategory(){
        const dataManager = new DataManager();
        return dataManager.getOne("category", this.category_id);
    }

    setProp(key, value){
        if(key == "id") return this; //pour interdire la modification de l'id
        this[key] = value;
        return this; //pour permettre le chainage des méthodes sur l'objet
    }


}