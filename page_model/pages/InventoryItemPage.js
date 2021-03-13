import { Selector, t } from 'testcafe';

class InventoryItemPage {
    constructor() {
        this.itemName = Selector('.inventory_details_name');
        this.addToCartButton = Selector('button.btn_primary').withText('ADD TO CART');
        this.backButton = Selector('.inventory_details_back_button');
    }

    async clickOnAddItemToCartButton() {
        await t.click(this.addToCartButton);
    }

    async clickOnBackButton() {
        await t.click(this.backButton);
    }
}

export default new InventoryItemPage();