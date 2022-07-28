// import sheet from './products.css' assert { type: 'css' };
// document.adoptedStyleSheets = [sheet];

export class AdminProductsView {

  models = null;
  constructor(models) {
    this.models = models;
    this.importCss();
    
  }

  importCss = async () => {
    const cssModule = await import('./products.css', {
        assert: { type: 'css' }
      });
      document.adoptedStyleSheets = [cssModule.default];
  }

  click = (tr, evt) => {
    console.log("row clicked for product id : ", evt.currentTarget.dataset.id, tr.dataset.id);
    // /admin/product/1
  }

  render = () => {
    const { products } = this.models;
    const liste = products.map((product) => {
        return `
            <tr data-id="${product.id}">
                <th scope="row" hidden>${product.id}</th>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.getCategory().title}</td>
                <td><img class="img-prod" alt="" src="${product.image}"/></td>
            </tr>
        `;
    }).join('');

    const viewHtml = `

        <div class="container">
            <h4>Liste des produits</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" hidden>Id</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Decription</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    ${liste}
                </tbody>
            </table>
        </div>
        `;

    const viewElement = document.createElement('div');
    viewElement.innerHTML = viewHtml;

    viewElement.querySelectorAll('tbody tr').forEach(tr => {
        tr.onclick = this.click.bind(this,tr);
    })

    return viewElement;

    
  };
}
