import { Selector, t } from 'testcafe';
import HeaderComponent from '../components/HeaderComponent';
import LeftSideBarComponent from '../components/LeftSideBarComponent';

class InventoryPage {
    constructor() {
        this.pageTitle = Selector('div.product_label');
        this.itemProductButtonLink = Selector('div.inventory_item_name');
        this.shoppingCartButton = Selector('div.shopping_cart_container');
    }

    async clickItemProduct(itemProductName) {
        await t.click(this.itemProductButtonLink.withText(itemProductName));
    }

    async clickOnShoppingCartButton() {
        await t.click(this.shoppingCartButton);
    }

    async clickOnLogoutLinkButton() {
        await t.click(HeaderComponent.burgerMenuButton);
        await t.click(LeftSideBarComponent.logoutLinkButton);
    }
}

export default new InventoryPage();