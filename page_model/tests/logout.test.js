import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import { standardUserRole } from '../roles/Roles';

fixture('Logout feature testing')
    .beforeEach(async t => {
        await t.maximizeWindow();
    });

// 3. Logout from product's page
test('User can perform logout after login', async t => {
    await t.useRole(standardUserRole);
    
    await t.expect(InventoryPage.pageTitle.exists).ok();
    
    await InventoryPage.clickOnLogoutLinkButton();
    await t.expect(LoginPage.loginWrapper.exists).ok();
});