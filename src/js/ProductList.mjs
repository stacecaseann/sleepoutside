import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product)
{
    return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
    <img src="${product.Images.PrimaryMedium}"
    alt="${product.Name}"/>
    <h3 class="card__brand">${product.Brand.Name}</h3>    
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.ListPrice}</p></a>
    </li>
    `
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
      }
    renderList(list)
    {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
    
}