import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import { CREDENTIALS } from '../data/Constants';
import { MESSAGES } from '../data/Messages';

fixture('Login feature testing')
    .page `https://www.saucedemo.com/`
    .beforeEach(async t => {
        await t.maximizeWindow()
    });

test('User can login with valid credentials', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_USERNAME, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_PASSWORD);
    
    await t.expect(InventoryPage.pageTitle.exists).ok();
});

test('User can not login with invalid credentials', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.INVALID_USER.SAUCEDEMO_INVALID_USERNAME, CREDENTIALS.INVALID_USER.SAUCEDEMO_INVALID_PASSWORD);

    await t.expect(LoginPage.errorMessageInvalidCredentials.exists).ok();
    await t.expect(LoginPage.errorMessageInvalidCredentials.innerText).contains(MESSAGES.ERROR_LOGIN);
});