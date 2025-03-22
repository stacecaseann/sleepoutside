import { loadHeaderFooter } from "./utils.mjs";
import CartTotal from "./CartTotal.mjs";



loadHeaderFooter();

const cartTotal = CartTotal.getInstance();
cartTotal.updateTotal();