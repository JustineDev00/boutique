import { Error404Controller } from "./controllers/error404.controller";
import { HomeController } from "./controllers/home.controller";
import { AdminController } from "./controllers/admin.controller";

export class App {

    static spaLinks = document.getElementsByClassName('spa-link');

    static start = () => {

        window.onpopstate = (evt) => { //événement qui se produit quand on se "deplace" dans l'historique du navigateur
            console.log("window.onpopstate");
            this.navigateToRoute(evt.state?.route || "")
        }

        window.onload = () => { 
            //événement qui se produit quand la page se charge 
            //refresh ou saisie d'une route dans la barre d'adresse du navigateur
            console.log("window.onload");
            if(!history.state){
                const route = location.pathname;
                this.pushRouteToHistory(route);
                this.navigateToRoute(route);
            }
            else{
                this.navigateToRoute(history.state?.route || "");
            }
        }

    }

    static navigate = (route) => {
        this.pushRouteToHistory(route);
        this.navigateToRoute(route);
    }

    static pushRouteToHistory = (route) => { //permet d'ajouter une route dans l'historique
        if(route == history.state?.route) return; //si la dernière entrée dans l'historique est la même inutile de l'ajouter
        console.log("pushRouteToHistory", route);
        history.pushState({
            route
        }, null, route);
    }

    static navigateToRoute = async (route) => { //permet d'afficher le contenu de la page demandée
        console.log("navigateToRoute", route);
        const routeItems = route.replace(/^\//, "").replace(/\/$/, "").split('/');//Je supprime les éventuels / au début et à la fin de la route et je la découpe pour obtenir un tableau
        const controllerName = routeItems?.shift() || "home"; //Je récupère la première partie de la route qui correspond au nom du controlleur
        let controller = await this.getController(controllerName); //Je récupère la classe controller correspondante au nom
        let actionName = routeItems?.shift() || "index"; //Je récupère la 2ème partie de la route qui corresppnd à la méthode du controller qui doit être exécutée
        if (!controller.hasOwnProperty(actionName)) { //Si la méthode n'existe pas dans le controller je vais chercher Error404Controller
            controller = new Error404Controller();
            actionName = "index";
        }
        const content = await controller[actionName](routeItems); //Je vais exécuter la méthode du controller et lui passe en arguments les eventuelles autres parties de la route
        // document.getElementById("root").innerHTML = content;
        document.getElementById("root").innerHTML = ""; //Je supprime le contenu de l'élément root
        document.getElementById("root").append(content); //Je mets le contenu que m'a renvoyé le controlleur dans l'élément root
        // 
        for(const link of this.spaLinks){
            link.onclick = (evt) => {
                evt.preventDefault();
                console.log("link.onclick");
                const href = evt.target.pathname || evt.target.closest('[data-route]').dataset.route;
                this.pushRouteToHistory(href);
                this.navigateToRoute(href);
            }
        }
    }

    static getController = async (name) => { //renvoie une instance de type Controller en fonction du name
        switch (name) {
            case "home": return new HomeController();
            case "admin": return new AdminController();
            default: return new Error404Controller();
        }
    }


}