
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
  

} 