import { getLocalStorage, setLocalStorage, getCartTotal } from "./utils.mjs";
import CartTotal from "./CartTotal.mjs";


export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.cartTotal = CartTotal.getInstance();
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails();
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    //cart item should have id, product, qty
    const cart = getLocalStorage('so-cart');
    
    const productId = this.product.Id;
    var existingItem = Object.values(cart).find(item => item.id === productId);

    if(existingItem)
    {
      existingItem.qty +=1;
    }
    else
    {
      cart[productId] = {id:this.product.Id, product:this.product, qty:1};
    }
    //Change to dictionary with id, product, qty
    //Find if this product id exists in the cart. If so, add the qty, otherwise add the product with qty 1

    // //cart.push(this.product);
    setLocalStorage('so-cart', cart);
    const ttl = getCartTotal(cart);
    this.cartTotal.updateTotal(ttl);
  }
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}
function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}
