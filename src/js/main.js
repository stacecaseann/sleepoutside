import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import CartTotal from './CartTotal.mjs';
import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const listing = new ProductList('Tents', dataSource, element);

listing.init();

//Set cart total from storage
// const cartTotal = CartTotal.getInstance();
// const cart = getLocalStorage('so-cart') || [];
// cartTotal.updateTotal(cart.length);

loadHeaderFooter();