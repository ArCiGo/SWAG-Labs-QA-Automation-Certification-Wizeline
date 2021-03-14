import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import { CREDENTIALS } from '../data/Constants';

fixture('Logout feature testing')
    .page `https://www.saucedemo.com/`
    .beforeEach(async t => {
        await t.maximizeWindow();
    });

// 3. Logout from product's page
test('User can perform logout after login', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_USERNAME, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_PASSWORD);
    await t.expect(InventoryPage.pageTitle.exists).ok();
    
    await InventoryPage.clickOnLogoutLinkButton();
    await t.expect(LoginPage.loginWrapper.exists).ok();
});