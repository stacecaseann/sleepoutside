import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const newItem = `
    <li class='cart-card divider'>
      <a href='#' class='cart-card__image'>
        <img src='${item.Image}' alt='${item.Name}' />
      </a>
      <a href='#'>
        <h2 class='card__name'>${item.Name}</h2>
      </a>
      <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
      <p class='cart-card__quantity'>qty: ${item.Quantity || 1}</p>  <!-- Dynamically display quantity -->
      <p class='cart-card__price'>$${item.FinalPrice}</p>
      <button class="remove-item" data-id="${item.Id}">X</button>
    </li>`;
  
  return newItem;
}

function removeItemFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('so-cart')) || [];

  // Find the item in the cart
  const itemIndex = cart.findIndex(item => item.Id === itemId);
  if (itemIndex !== -1) {
    const item = cart[itemIndex];
    
    // If quantity is greater than 1, reduce it by 1
    if (item.Quantity > 1) {
      cart[itemIndex].Quantity -= 1;
    } else {
      // If quantity is 1, remove the item completely
      cart.splice(itemIndex, 1);
    }
  }

  localStorage.setItem('so-cart', JSON.stringify(cart));
  renderCartContents();
}

document.querySelector('.product-list').addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('remove-item')) {
    event.preventDefault();
    const itemId = event.target.getAttribute('data-id');
    if (itemId) {
      removeItemFromCart(itemId);
    }
  }
});

renderCartContents();
