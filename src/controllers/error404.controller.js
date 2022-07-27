export class Error404Controller{

    constructor(){
        console.log(this.constructor.name);
    }

    index = (params) => {
        return "Error404Controller.index"
    }
}