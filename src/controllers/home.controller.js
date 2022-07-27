export class HomeController{
    
    constructor(){
        console.log(this.constructor.name);
    }

    index = (params) => {
        return "Accueil";
    }

    contact = (params) => {
        return "Contactez nous";
    }
}