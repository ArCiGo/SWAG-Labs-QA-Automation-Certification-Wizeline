import { CREDENTIALS } from '../data/Constants';
import InventoryItemPage from '../pages/InventoryItemPage';
import InventoryPage from '../pages/InventoryPage';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import { MESSAGES } from '../data/Messages';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

fixture('Shopping Cart')
    .page `https://www.saucedemo.com/`
    .beforeEach(async t => {
        await t.maximizeWindow()
    });

test('User can see the Inventory page', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_USERNAME, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_PASSWORD);
    await t.expect(InventoryPage.pageTitle.exists).ok();
});

test('User can add an item to the shopping cart', async t => {
    const productItem = 'Sauce Labs Backpack'

    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_USERNAME, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_PASSWORD);
    await t.expect(InventoryPage.pageTitle.exists).ok();
    await InventoryPage.clickItemProduct(productItem);
    await InventoryItemPage.clickOnAddItemToCartButton();
    await InventoryItemPage.clickOnBackButton();
    await InventoryPage.clickOnShoppingCartButton();
    await t.expect(CartPage.itemName.innerText).contains(productItem);
});

test('User can add multiple items to the shopping cart', async t => {
    const productItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_USERNAME, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_PASSWORD);
    await t.expect(InventoryPage.pageTitle.exists).ok();

    productItems.forEach((item) => {
        InventoryPage.clickItemProduct(item);
        InventoryItemPage.clickOnAddItemToCartButton();
        InventoryItemPage.clickOnBackButton()
    });

    await InventoryPage.clickOnShoppingCartButton();
    await t.expect(CartPage.itemName.count).eql(3)

    for(let i = 0; i < productItems.length; i ++) {
        for(let j = 0; j < CartPage.itemName.count; j ++) {
            await t.expect(CartPage.itemName.innerText).contains(productItems[i]);
        }
    }
});

test('User can\'t continue with purchase if he/she doesn\'t enter checkout information', async t => {
    const productItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_USERNAME, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_PASSWORD);
    await t.expect(InventoryPage.pageTitle.exists).ok();

    productItems.forEach((item) => {
        InventoryPage.clickItemProduct(item);
        InventoryItemPage.clickOnAddItemToCartButton();
        InventoryItemPage.clickOnBackButton()
    });

    await InventoryPage.clickOnShoppingCartButton();
    await t.expect(CartPage.itemName.count).eql(3)

    for(let i = 0; i < productItems.length; i ++) {
        for(let j = 0; j < CartPage.itemName.count; j ++) {
            await t.expect(CartPage.itemName.innerText).contains(productItems[i]);
        }
    }

    await CartPage.clickOnCheckoutButton();
    await CheckoutPage.clickOnContinueButton();
    await t.expect(CheckoutPage.firstNameErrorMessage.innerText).contains(MESSAGES.ERROR_FIRST_NAME_CHECKOUT);
});

test.only('User can continue with purchase if he/she does enter checkout information', async t => {
    const productItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_USERNAME, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_PASSWORD);
    await t.expect(InventoryPage.pageTitle.exists).ok();

    productItems.forEach((item) => {
        InventoryPage.clickItemProduct(item);
        InventoryItemPage.clickOnAddItemToCartButton();
        InventoryItemPage.clickOnBackButton()
    });

    await InventoryPage.clickOnShoppingCartButton();
    await t.expect(CartPage.itemName.count).eql(3)

    for(let i = 0; i < productItems.length; i ++) {
        for(let j = 0; j < CartPage.itemName.count; j ++) {
            await t.expect(CartPage.itemName.innerText).contains(productItems[i]);
        }
    }

    await CartPage.clickOnCheckoutButton();
    await CheckoutPage.fillCheckoutForm('Armando', 'Cifuentes', '64333')
    await CheckoutPage.clickOnContinueButton();
    await t.expect(CheckoutOverviewPage.pageTitle.innerText).contains('Checkout: Overview');

    // Asserting if the items are the ones we added to the cart before finishing the purchase
    for(let i = 0; i < productItems.length; i ++) {
        for(let j = 0; j < CheckoutOverviewPage.inventoryItemName.count; j ++) {
            await t.expect(CartPage.itemName.innerText).contains(productItems[i]);
        }
    }

    await t.click(CheckoutOverviewPage.finishButton);
    await t.expect(CheckoutCompletePage.confirmationMessage.innerText).contains(MESSAGES.PURCHASE_CONFIRMATION);
});