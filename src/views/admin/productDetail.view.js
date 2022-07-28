import { DataManager } from "../../helpers/dataManager.helper";
import { Product } from "../../models/product.model";

export class AdminProductDetailView {
  models = null;
  constructor(models) {
    this.models = models;
    //this.importCss();
  }

  importCss = async () => {
    const cssModule = await import("./categories.css", {
      assert: { type: "css" },
    });
    document.adoptedStyleSheets = [cssModule.default];
  };

  render = () => {
    const { product, categories } = this.models;

    const selectOptions = categories.map((category) => {
      return `
                <option value="${category.id}" ${category.id == product.category_id ? "selected" : ""}>
                    ${category.title}
                </option>
            `;
    });

    const viewHtml = `
        <div class="container px-5 my-5">
            <form id="product_form" data-id="${product.id}">
                <div class="form-floating mb-3">
                    <input class="form-control" name="title" value="${product.title}" id="title" type="text" placeholder="Titre" data-sb-validations="" />
                    <label for="title">Titre</label>
                </div>
                <div class="form-floating mb-3">
                    <input class="form-control" name="price" value="${product.price}" id="price" type="text" placeholder="Prix" data-sb-validations="" />
                    <label for="price">Prix</label>
                </div>
                <div class="form-floating mb-3">
                    <select class="form-select" id="category_id" name="category_id" aria-label="Catégorie">
                        ${selectOptions}
                    </select>
                    <label for="category_id">Catégorie</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea class="form-control" id="description" name="description" type="text" placeholder="Description" style="height: 10rem;" data-sb-validations="">
                        ${product.description}
                    </textarea>
                    <label for="description">Description</label>
                </div>
                <div class="form-floating mb-3">
                    <input class="form-control" id="image" name="image" value="${product.image}" type="text" placeholder="Image" data-sb-validations="" />
                    <label for="image">Image</label>
                    <div class="p-1 text-center">
                        <img id="img-view" alt="" src="${product.image}"/>
                    </div>
                </div>

                <div class="d-flex">
                    <button class="btn btn-danger btn-lg" id="cancelButton" type="button">Cancel</button>
                    <button class="btn btn-success btn-lg ms-auto" id="submitButton" type="submit">Save</button>
                </div>
            </form>
        </div>
    
        `;

    const viewElement = document.createElement("div");
    viewElement.innerHTML = viewHtml;

    viewElement.querySelector("#image").onchange = (evt) => {
      viewElement.querySelector("#img-view").src = evt.currentTarget.value;
    };

    viewElement.querySelector('#cancelButton').onclick = (evt) => {
        history.back();
    }

    viewElement.querySelector("#product_form").onsubmit = (evt) => {
            evt.preventDefault();
            console.log("form submitted");
            const data = new FormData(evt.currentTarget);
            const jsonProduct = Object.fromEntries(data.entries());
            jsonProduct.id = evt.currentTarget.dataset.id;
            const productToUpdate = new Product(jsonProduct);
            const dm = new DataManager();
            dm.update(productToUpdate);
            alert("Le produit a été mis à jour !")
            history.back();
      };

    return viewElement;
  };
}
