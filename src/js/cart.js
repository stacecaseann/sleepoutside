import { getLocalStorage } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();
function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = Object.values(cartItems).map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const product = item.product;
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${product.Images.PrimaryMedium}'
      alt='${product.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${product.Name}</h2>
  </a>
  <p class='cart-card__color'>${product.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: ${item.qty}</p>
  <p class='cart-card__price'>$${product.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
