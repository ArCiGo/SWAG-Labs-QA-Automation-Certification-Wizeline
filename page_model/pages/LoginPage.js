import { Selector, t } from 'testcafe';

class LoginPage {
    constructor() {
        this.loginWrapper = Selector('div.login_wrapper');
        this.usernameField = Selector('input[name="user-name"]');
        this.passwordField = Selector('input[name="password"]');
        this.loginButton = Selector('input[value="LOGIN"]');
        this.errorMessageInvalidCredentials = Selector('h3[data-test="error"]');
    }

    async submitLoginForm(username, password) {
        await t.selectText(this.usernameField).pressKey('delete').typeText(this.usernameField, username, { paste: true });
        await t.selectText(this.passwordField).pressKey('delete').typeText(this.passwordField, password, { paste: true });
        
        await t.click(this.loginButton);
    }
}

export default new LoginPage();