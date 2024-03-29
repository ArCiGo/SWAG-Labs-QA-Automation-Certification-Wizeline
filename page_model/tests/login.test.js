import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import { CREDENTIALS } from '../data/Constants';
import { MESSAGES } from '../data/Messages';
import { standardUserRole } from '../roles/Roles';

fixture('Login feature testing')
    .page `https://www.saucedemo.com/`
    .beforeEach(async t => {
        await t.maximizeWindow();
    });

//  1. Login with valid user
test('User can login with valid credentials', async t => {
    await t.useRole(standardUserRole);
    
    await t.expect(InventoryPage.pageTitle.exists).ok();
});

// 2. Login with invalid user
test('User can\'t login with invalid credentials', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.INVALID_USER.SAUCEDEMO_INVALID_USERNAME, CREDENTIALS.INVALID_USER.SAUCEDEMO_INVALID_PASSWORD);
    await t.expect(LoginPage.errorMessageInvalidCredentials.exists).ok();
    await t.expect(LoginPage.errorMessageInvalidCredentials.innerText).contains(MESSAGES.ERROR_LOGIN);
});