import { Category } from "../models/category.model";
import { Product } from "../models/product.model";

export class DataManager {
  folder = "data";
  files = [];

  constructor(files, folder = "data") {
    this.files = files;
    this.folder = folder;
  }

  initDataStorage = async () => {
    const dataStorage = {};
    for (const file of this.files) {
      dataStorage[file + "Data"] = await this.readJsonFile(file);
    }
    localStorage.setItem("data", JSON.stringify(dataStorage));
    console.log("localStorage data initialized", dataStorage);
  };

  readJsonFile = async (file) => {
    let items = [];
    await fetch(`./src/${this.folder}/${file}.json`)
      .then((resp) => {
        return resp.text();
      })
      .then((text) => {
        items = JSON.parse(text);
      });
    return items;
  };

  getAll = (table, withDeleted = false) => {
    const data = JSON.parse(localStorage.getItem("data"));
    let rows = data[table + "Data"];
    if(!withDeleted){
        rows = rows?.filter((item) => !item.isDeleted)
    }
    return rows      
      .map((row) => {
        switch (table) {
          case "category":
            return new Category(row);
          case "product":
            return new Product(row);
        }
      });
  };

  getOne = (table, id, withDeleted = false) => {
    const data = JSON.parse(localStorage.getItem("data"));
    let rows = data[table + "Data"]
    if(!withDeleted){
        rows = rows?.filter((item) => !item.isDeleted)
    }
    const row = rows.find((item) => item.id == id);
    if (!row) {
      return undefined;
    }
    switch (table) {
      case "category":
        return new Category(row);
      case "product":
        return new Product(row);
    }
  };

  getDeletedOnly = (table, id) => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (!id) {
      return data[table + "Data"]
        ?.filter((item) => item.isDeleted)
        .map((row) => {
          switch (table) {
            case "category":
              return new Category(row);
            case "product":
              return new Product(row);
          }
        });
    }
    if (id) {
      const row = data[table + "Data"]
        ?.filter((item) => item.isDeleted)
        .find((item) => item.id == id);
      if (!row) {
        return undefined;
      }
      switch (table) {
        case "category":
          return new Category(row);
        case "product":
          return new Product(row);
      }
    }
  };

  update(model) {
    const data = JSON.parse(localStorage.getItem("data")); //Je récupère toutes les données
    const table = model.constructor.name.toLowerCase(); //Je récupère le nom de la table correspondant à l'objet
    const dataTable = data[table + "Data"]; //Je récupère la table dont j'ai besoin
    let row = dataTable?.find((item) => item.id == model.id); //Je récupère la ligne qui m'intéresse (grace à l'id)
    for(const key in row){ //Je mets à jour la ligne
        row[key] = model[key]
    }
    // Object.assign(row, model);
    localStorage.setItem("data", JSON.stringify(data)); //Je sauvegarde les données en localStorage
    console.log(model.constructor.name + " data row updated", model);
  }

  insert(model) {
    const data = JSON.parse(localStorage.getItem("data")); //Je récupère toutes les données
    const table = model.constructor.name.toLowerCase(); //Je récupère le nom de la table correspondant à l'objet
    const dataTable = data[table + "Data"]; //Je récupère la table dont j'ai besoin
    const maxId = Math.max(...dataTable.map((obj) => obj.id)); //Je récupère l'id max de la table
    model.id = maxId + 1; //Je met à jour l'id de l'objet à ajouter
    dataTable.push(model); //J'ajoute l'objet dans la table
    localStorage.setItem("data", JSON.stringify(data)); //Je sauvegarde les données en localStorage
    console.log(model.constructor.name + " data row inserted", model);
  }

  delete(model, hard = false) {
    //version soft ou hard
    const data = JSON.parse(localStorage.getItem("data")); //Je récupère toutes les données
    const table = model.constructor.name.toLowerCase(); //Je récupère le nom de la table correspondant à l'objet
    let dataTable = data[table + "Data"]; //Je récupère la table dont j'ai besoin
    if (!hard) {
      model.isDeleted = true;
      this.update(model);
    }
    if (hard) {
      const indexOfObject = dataTable.findIndex((object) => {
        //Je récupère l'index du model dans la table
        return object.id === model.id;
      });
      dataTable.splice(indexOfObject, 1); //Je supprime la ligne correspondante à l'index du model de la table
      localStorage.setItem("data", JSON.stringify(data)); //Je sauvegarde les données en localStorage
    }
    console.log(model.constructor.name + " data row deleted " + (hard ? "hard" : "soft"), model);
  }
}
