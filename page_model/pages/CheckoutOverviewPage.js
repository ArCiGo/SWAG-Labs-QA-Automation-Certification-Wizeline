import { Selector, t } from 'testcafe';

class CheckoutOverviewPage {
    constructor() {
        this.pageTitle = Selector('div.subheader');
        this.inventoryItemName = Selector('div.inventory_item_name');
        this.finishButton = Selector('a.cart_button');
        this.cancelButton = Selector('a.cart_cancel_link');
    }
}

export default new CheckoutOverviewPage();