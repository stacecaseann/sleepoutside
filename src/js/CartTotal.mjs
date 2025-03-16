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
        this.cartElement.textContent = this.total;
    }
}