import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    cartItems = cartItems ? [cartItems] : [];
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>  <!-- Dynamically display quantity -->
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function addToCart(item) {
  let cart = getLocalStorage("so-cart") || [];

  if (!Array.isArray(cart)) {
    cart = [cart];
  }

  const existingItem = cart.find(cartItem => cartItem.Id === item.Id);
  if (existingItem) {
    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
    item.Quantity = 1;
    cart.push(item);
  }

  localStorage.setItem("so-cart", JSON.stringify(cart));

  renderCartContents();
}

const exampleItem = {
  Id: "123",
  Name: "Test Item",
  Image: "test-item.jpg",
  FinalPrice: 10.99,
  Colors: [{ ColorName: "Red" }],
};

addToCart(exampleItem);

renderCartContents();
