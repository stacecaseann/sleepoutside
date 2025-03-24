import CartTotal from "./CartTotal.mjs";
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  
  return JSON.parse(localStorage.getItem(key)) || {};
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function getCartTotal(cart)
{
    let ttl = 0;
    for (let key in cart)
    {
      const currentQty = cart[key].qty;
      ttl += currentQty;
    }
    return ttl;
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn, 
  parentElement,
  list,
  position = 'afterbegin', 
  clear = false)
{
   //var html = productList.map((product) => productCardTemplate(product));
    var html = list.map(templateFn);
    if (clear)
    {
      parentElement.innerHTML = '';
    }
    parentElement.insertAdjacentHTML(position,html.join(''));
}

function renderWithTemplate(
  template, 
  parentElement,
  data,
  callback)
{
   //var html = productList.map((product) => productCardTemplate(product));
    parentElement.innerHTML = template;
    if (callback)
    {
      callback(data);
    }
}

async function loadTemplate(path){
  const results = await fetch(path);
  const template = await results.text();
  return template;
}

export async function loadHeaderFooter()
{
  const headerPath = '../partials/header.html';
  const footerPath = '../partials/footer.html';

  const headerTemplate = await loadTemplate(headerPath);
  const footerTemplate = await loadTemplate(footerPath);

  const headerElement = document.querySelector('#main-header');
  const footerElement = document.querySelector('#main-footer');
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  const cartTotal = CartTotal.getInstance();
  cartTotal.showTotal();
}