export class App {

    spaLinks = document.getElementsByClassName('spa-link');

    start = () => {

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

    pushRouteToHistory = (route) => {
        console.log("pushRouteToHistory", route);
        history.pushState({
            route
        }, null, route);
    }

    navigateToRoute = (route) => {
        console.log("navigateToRoute", route);
        //Prochaine étape : aller chercher un controller ...

        for(const link of this.spaLinks){
            link.onclick = (evt) => {
                evt.preventDefault();
                console.log("link.onclick");
                const route = evt.target.pathname;
                this.pushRouteToHistory(route);
                this.navigateToRoute(route);
            }
        }
    }


}