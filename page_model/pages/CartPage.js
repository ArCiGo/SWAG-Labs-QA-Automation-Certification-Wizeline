import { Selector, t } from 'testcafe';

class CartPage {
    constructor() {
        this.pageTitle = Selector('.subheader');
        this.itemName = Selector('div.inventory_item_name');
        this.checkoutButton = Selector('.checkout_button');
    }

    async clickOnCheckoutButton() {
        await t.click(this.checkoutButton);
    }
}

export default new CartPage();