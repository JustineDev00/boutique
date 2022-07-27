export class HomeController{
    
    constructor(){
        console.log(this.constructor.name);
    }

    index = (params) => {
        return "HomeController.index"
    }
}