import CheckoutProcess from "./CheckoutProcess.mjs";

console.log("In checkout process");

document.getElementById('postal').addEventListener('input',() => 
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

  order.checkout();
});
