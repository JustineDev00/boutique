
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

}