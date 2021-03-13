import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import HeaderComponent from '../components/HeaderComponent';
import LeftSideBarComponent from '../components/LeftSideBarComponent';
import { CREDENTIALS } from '../data/Constants';

fixture('Login feature testing')
    .page `https://www.saucedemo.com/`
    .beforeEach(async t => {
        await t.maximizeWindow()
    });

test('User can login with valid credentials and then can logout', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_USERNAME, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_PASSWORD);
    
    await t.expect(InventoryPage.pageTitle.exists).ok();
    
    // await HeaderComponent.clickBurgerMenuButton();
    // await LeftSideBarComponent.clickLogoutLinkButton();
    await InventoryPage.clickOnLogoutLinkButton();
    await LoginPage.isDisplayed();
});