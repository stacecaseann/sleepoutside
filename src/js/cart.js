import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';
import CartTotal from './CartTotal.mjs';
loadHeaderFooter();
function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = Object.values(cartItems).map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  const minusElements = document.querySelectorAll('.cart-qty-minus');
  const plusElements = document.querySelectorAll('.cart-qty-plus');
  minusElements.forEach(minusElement => 
  {
    minusElement.addEventListener('click', () => 
    {
      const id = minusElement.id;
      const qtySpan = minusElement.nextElementSibling; 
      const newQty = updateQty(id, 'minus',cartItems);
      if (newQty === 0)
      {
        const liElement = minusElement.closest('li');
        if (liElement) {
          liElement.remove();
        }
      }
      if (newQty != -1 && qtySpan)
      {
        qtySpan.textContent  = newQty;
      }
    })
  }
  );
  plusElements.forEach(plusElement => 
    {
      plusElement.addEventListener('click', () => 
      {
        const id = plusElement.id;
        const qtySpan = plusElement.previousElementSibling; 
        const newQty = updateQty(id, 'plus',cartItems);
        if (newQty != -1 && qtySpan)
        {
          qtySpan.textContent  = newQty;
        }
      })
    }
    );
}

function updateQty(id, minusPlusFlag,cartItems)
{
  let qty=-1;
  const item = Object.values(cartItems).find((item) => item.id == id);
  if (item)
  {
    if (minusPlusFlag === 'minus')
    {
      let itemQty = item.qty;
      if (itemQty === 1 || itemQty ===0)
      {
        delete cartItems[id];
        qty=0;
      }
      else{
        item.qty -=1;
        qty=item.qty;
      }
    }
    else
    {
      item.qty += 1;
      qty=item.qty;
    }
    setLocalStorage('so-cart', cartItems);
      const cartTotal = CartTotal.getInstance();
      cartTotal.showTotal();
  }
  return qty;
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
  <p class='cart-card__quantity'>qty: <span class='cart-qty-minus' id=${product.Id} item=>-</span> <span class='qty'>${item.qty}</span> <span class='cart-qty-plus' id=${product.Id}>+</span></p>
  <p class='cart-card__price'>$${product.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
