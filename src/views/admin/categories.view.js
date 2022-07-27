import sheet from './categories.css' assert { type: 'css' };
document.adoptedStyleSheets = [sheet];

export class HomeViewIndex {

  models = null;
  constructor(models) {
    this.models = models;
  }

  click = (evt) => {
    console.log("row clicked", evt);
  }

  render = () => {
    const { categories } = this.models;
    const liste = categories.map((category) => {
        return `
            <tr data-id="${category.id}">
                <th scope="row" hidden>${category.id}</th>
                <td>${category.title}</td>
                <td>${category.description}</td>
                <td>${category.getProductList().length}</td>
                <td><img class="img-cat" alt="" src="${category.image}"/></td>
            </tr>
        `;
    }).join('');

    const viewHtml = `

        <div class="container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" hidden>Id</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Decription</th>
                        <th scope="col">Nb prod.</th>
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
        tr.onclick = this.click.bind(tr);
    })

    return viewElement;

    
  };
}
