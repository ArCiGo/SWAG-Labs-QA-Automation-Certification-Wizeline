import { Selector, t } from 'testcafe';

class CheckoutPage {
    constructor() {
        this.pageTitle = Selector('div.subheader');
        this.firstNameField = Selector('#first-name');
        this.lastNameField = Selector('#last-name');
        this.postalCodeField = Selector('#postal-code');
        this.cancelLinkButton = Selector('a.cart_cancel_link');
        this.continueLinkButton = Selector('input[value="CONTINUE"]');
        this.firstNameErrorMessage = Selector('h3[data-test="error"]')
    }

    async fillCheckoutForm(firstName, lastName, postalCode) {
        await t.selectText(this.firstNameField).pressKey('delete').typeText(this.firstNameField, firstName, { paste: true });
        await t.selectText(this.lastNameField).pressKey('delete').typeText(this.lastNameField, lastName, { paste: true });
        await t.selectText(this.postalCodeField).pressKey('delete').typeText(this.postalCodeField, postalCode, { paste: true });
    }

    async clickOnContinueButton() {
        await t.click(this.continueLinkButton);
    }
}

export default new CheckoutPage();