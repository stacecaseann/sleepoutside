
import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');
const productId = getParam('product');


const product = new ProductDetails(productId, dataSource);
product.init();
