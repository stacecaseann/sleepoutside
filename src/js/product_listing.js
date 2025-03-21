import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
const param = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector('.product-list');

const listing = new ProductList(param, dataSource, element);

listing.init();
loadHeaderFooter();