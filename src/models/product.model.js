
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

}