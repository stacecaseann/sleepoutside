import { 
  getCartTotal, 
  getLocalStorage, 
  setLocalStorage,
  alertMessage,
  removeAllAlerts
 } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = Object.values(items).map((item) => {
    console.log(item);
    return {
      id: item.product.Id,
      price: item.product.FinalPrice,
      name: item.product.Name,
      quantity: item.qty,
    };
  });
  return simplifiedItems;
}



export default class CheckoutProcess {
    constructor(/*key, outputSelector*/) {
      // this.key = key;
      // this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage('so-cart');
      this.calculateItemSummary();
    }
    calculateItemSummary()
    {
        this.calculateItemSubTotal();
        this.calculateOrderTotal();
        
    }
    calculateItemSubTotal() {
      // calculate and display the total dollar amount of the items in the cart, and the number of items.
      let ttl = 0;
      const cart = this.list;
      for (let key in cart)
      {
        const qty = cart[key].qty;
        ttl += qty * cart[key].product.FinalPrice;
      }
      this.itemTotal = ttl;
    }
  
    calculateOrderTotal() {
      // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
      this.tax = (this.itemTotal *.06);
      const ttlItems = getCartTotal(this.list);

      this.shipping = 10 + (ttlItems-1)*2;
      this.orderTotal = this.itemTotal + this.tax + this.shipping;
  
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      //const tax = document.querySelector(`${this.outputSelector} #tax`);
      //tax.innerText = `$${this.tax.toFixed(2)}`;
      //const tax 
      const totalElement = document.querySelector('.checkout');
      const ttlTemplate = `<div>Subtotal</div><div>$${this.itemTotal}</div>
      <div>Tax</div><div>$${this.tax}</div>
      <div>Shipping Estimate</div><div>$${this.shipping}</div>
      <hr class="line"><hr class="line">
      <div>Order Total</div><div>$${this.orderTotal}</div>
      `;
      totalElement.innerHTML = ttlTemplate;
    }

    
  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    console.log(order);
    try {
      const response = await services.checkout(order);
      console.log(response);
      setLocalStorage('so-cart', []);
      location.assign('/checkout/success.html');

    } catch (err) {
      removeAllAlerts();
      for(let message in err.message)
      {
        alertMessage(err.message[message]);
      }
      console.log(err);
    }
  }
}