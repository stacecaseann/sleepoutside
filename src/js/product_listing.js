import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
const param = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector('.product-list');

const listing = new ProductList(param, dataSource, element);

listing.init();
loadHeaderFooter();