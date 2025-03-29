import CheckoutProcess from "./CheckoutProcess.mjs";



document.querySelector('postal').addEventListener('input',() => 
{
    const checkout = new CheckoutProcess()
    checkout.init();
});