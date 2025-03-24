import { getLocalStorage, getCartTotal } from './utils.mjs';
export default class CartTotal{
    constructor()
    {
        if (!CartTotal.instance)
        {
            this.total = 0;
            CartTotal.instance = this;
            this.cartElement = document.getElementById("cart-total");
        }
        return CartTotal.instance;
    }
    static getInstance(){
        if (!CartTotal.instance)
        {
            CartTotal.instance = new CartTotal();
        }
        return CartTotal.instance;
    }
    updateTotal(total)
    {
        
        this.total = total;
        if (!this.cartElement)
        {
            this.cartElement = document.getElementById("cart-total");
        }
        if (this.cartElement)
        {
            this.cartElement.textContent = this.total;
        }
    }
    showTotal()
    {
        const cart = getLocalStorage('so-cart') || [];
        this.updateTotal(getCartTotal(cart));

    }
}