export class Error404Controller{

    constructor(){
        console.log(this.constructor.name);
    }

    index = (params) => {
        return "Erreur 404, cette page n'existe pas !"
    }
}