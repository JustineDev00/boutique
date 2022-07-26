import { Category } from "../models/category.model";
import { Product } from "../models/product.model";

export class DataManager{

    folder = "data";
    files = [];

    constructor(files, folder = "data"){
        this.files = files;
        this.folder = folder;
    }

    initDataStorage = async () => {
        const dataStorage = {};
        for(const file of this.files){
            dataStorage[file + "Data"] = await this.readJsonFile(file);
        }
        localStorage.setItem("data", JSON.stringify(dataStorage));
        console.log("localStorage data initialized" , dataStorage);
    }

    readJsonFile = async (file) => {
        let items = [];
        await fetch(`./src/${this.folder}/${file}.json`)
            .then(resp => {
                return resp.text();
            })
            .then(text => {
                items = JSON.parse(text);
            });
        return items;
    }

    getAll = (table) => {
        const data = JSON.parse(localStorage.getItem('data'));
        return data[table + "Data"]?.map(row => {
            switch(table){
                case "category":
                    return new Category(row);
                case "product":
                    return new Product(row);
            }
        });
    }

    getOne = (table, id) => {
        const data = JSON.parse(localStorage.getItem('data'));
        const row = data[table + "Data"]?.find(item => item.id == id);
        if(!row){
            return undefined;
        }
        switch(table){
            case "category":
                return new Category(row);
            case "product":
                return new Product(row);
        }
    }

    update(model){

        const data = JSON.parse(localStorage.getItem('data')); //Je récupère toutes les données
        const table = model.constructor.name.toLowerCase(); //Je récupère le nom de la table correspondant à l'objet
        const dataTable = data[table + "Data"]; ///Je récupère la table dont j'ai besoin
        let row = dataTable?.find(item => item.id == model.id); //Je récupère la ligne qui m'intéresse (grace à l'id)
        // for(const key in row){ //Je mets à jour la ligne
        //     row[key] = model[key]
        // }
        Object.assign(row, model);
        localStorage.setItem("data", JSON.stringify(data)); //Je sauvegarde les données en localStorage
        console.log(model.constructor.name + " data row updated", model);
    }


  

} 