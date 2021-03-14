import InventoryItemPage from '../pages/InventoryItemPage';
import InventoryPage from '../pages/InventoryPage';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';
import { CREDENTIALS, INVENTORY_ITEMS, CHECKOUT_INFO } from '../data/Constants';
import { MESSAGES } from '../data/Messages';

fixture('Shopping Cart')
    .page `https://www.saucedemo.com/`
    .beforeEach(async t => {
        await t.maximizeWindow();
        await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_USERNAME, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_PASSWORD);
    });

// 4. Navigate to the shopping cart
test('User can navigate to the Shopping Cart page', async t => {
    await t.expect(InventoryPage.pageTitle.exists).ok();
    
    await InventoryPage.clickOnShoppingCartButton();
    await t.expect(CartPage.pageTitle.exists).ok();
    await t.expect(CartPage.pageTitle.innerText).contains('Your Cart');
});

// 5. Add single item to the shopping cart 
test('User can add an item to the shopping cart', async t => {
    const inventoryItem = 'Sauce Labs Backpack'

    await t.expect(InventoryPage.pageTitle.exists).ok();
    await t.expect(InventoryPage.pageTitle.innerText).contains('Products');

    await InventoryPage.clickOnInventoryItem(inventoryItem);
    await InventoryItemPage.clickOnAddItemToCartButton();
    await InventoryItemPage.clickOnBackButton();
    await InventoryPage.clickOnShoppingCartButton();

    await t.expect(CartPage.itemName.innerText).contains(inventoryItem);
});

// 6. Add multiple items to the shopping cart
test('User can add multiple items to the shopping cart', async t => {
    await t.expect(InventoryPage.pageTitle.exists).ok();

    INVENTORY_ITEMS.forEach((item) => {
        InventoryPage.clickOnInventoryItem(item);
        InventoryItemPage.clickOnAddItemToCartButton();
        InventoryItemPage.clickOnBackButton()
    });

    await InventoryPage.clickOnShoppingCartButton();
    await t.expect(CartPage.itemName.count).eql(3)

    for(let i = 0; i < INVENTORY_ITEMS.length; i ++) {
        for(let j = 0; j < CartPage.itemName.count; j ++) {
            await t.expect(CartPage.itemName.innerText).contains(INVENTORY_ITEMS[i]);
        }
    }
});

// 7. Continue with missing mail information
test('User can\'t continue with purchase if he/she doesn\'t enter checkout information', async t => {
    await t.expect(InventoryPage.pageTitle.exists).ok();

    INVENTORY_ITEMS.forEach((item) => {
        InventoryPage.clickOnInventoryItem(item);
        InventoryItemPage.clickOnAddItemToCartButton();
        InventoryItemPage.clickOnBackButton()
    });

    await InventoryPage.clickOnShoppingCartButton();
    await t.expect(CartPage.itemName.count).eql(3)

    for(let i = 0; i < INVENTORY_ITEMS.length; i ++) {
        for(let j = 0; j < CartPage.itemName.count; j ++) {
            await t.expect(CartPage.itemName.innerText).contains(INVENTORY_ITEMS[i]);
        }
    }

    await CartPage.clickOnCheckoutButton();
    await CheckoutPage.clickOnContinueButton();
    await t.expect(CheckoutPage.firstNameErrorMessage.innerText).contains(MESSAGES.ERROR_FIRST_NAME_CHECKOUT);
});

//  8. Fill user's information
test('User can continue with purchase if he/she does enter checkout information', async t => {
    await t.expect(InventoryPage.pageTitle.exists).ok();

    INVENTORY_ITEMS.forEach((item) => {
        InventoryPage.clickOnInventoryItem(item);
        InventoryItemPage.clickOnAddItemToCartButton();
        InventoryItemPage.clickOnBackButton()
    });

    await InventoryPage.clickOnShoppingCartButton();
    await t.expect(CartPage.itemName.count).eql(3)

    for(let i = 0; i < INVENTORY_ITEMS.length; i ++) {
        for(let j = 0; j < CartPage.itemName.count; j ++) {
            await t.expect(CartPage.itemName.innerText).contains(INVENTORY_ITEMS[i]);
        }
    }

    await CartPage.clickOnCheckoutButton();

    await t.expect(CheckoutPage.pageTitle.innerText).contains('Checkout: Your Information');
    await CheckoutPage.fillCheckoutForm(CHECKOUT_INFO[0], CHECKOUT_INFO[1], CHECKOUT_INFO[2]);
    await CheckoutPage.clickOnContinueButton();

    await t.expect(CheckoutOverviewPage.pageTitle.innerText).contains('Checkout: Overview');

    // 9. Final order items
    for(let i = 0; i < INVENTORY_ITEMS.length; i ++) {
        for(let j = 0; j < CheckoutOverviewPage.inventoryItemName.count; j ++) {
            await t.expect(CartPage.itemName.innerText).contains(INVENTORY_ITEMS[i]);
        }
    }

    // 10. Complete a purchase
    await t.click(CheckoutOverviewPage.finishButton);

    await t.expect(CheckoutCompletePage.pageTitle.innerText).contains('Finish');
    await t.expect(CheckoutCompletePage.confirmationMessage.innerText).contains(MESSAGES.PURCHASE_CONFIRMATION);
});