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
//   console.log(JSON.stringify(data));
//   console.log(JSON.stringify(data['880RT'].qty));
//   console.log(JSON.stringify(data['880RT'].id));
//   console.log(JSON.stringify(data['880RT'].product));
//   console.log(data);
//   console.log(Array.isArray(data));  // Check if it's an array
// console.log(typeof data);          // Check if it's an object
  console.log(JSON.stringify(data));

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

export function alertMessage(message, scroll = true) {
  // create element to hold the alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function(e) {
      if( e.target.tagName == 'SPAN') { // how can you tell if they clicked on the X or on something else?  hint: check out e.target.tagName or e.target.innerText
        main.removeChild(this);
      }
  })
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  // you may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
