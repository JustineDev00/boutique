export class BaseModel{

    id = -1;
    isDeleted = false;

    assign(props){
        for(const key in props){ 
            if(!this.hasOwnProperty(key)){
                delete props[key];
            }
        }
        Object.assign(this, props);
    }

    setProp(key, value){
        if(key == "id") return this; //pour interdire la modification de l'id
        this[key] = value;
        console.log(`${this.constructor.name} ${key} updated`, this);
        return this; //pour permettre le chainage des méthodes sur l'objet
    }


}