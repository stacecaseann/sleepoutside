import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

console.log("In checkout process");

document.getElementById('zip').addEventListener('input',() => 
{
    const checkout = new CheckoutProcess()
    checkout.init();
});

const order = new CheckoutProcess();
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  // const validate = myForm.checkValidity();
  // myForm.reportValidity();
  // if (validate)
     order.checkout();
});
