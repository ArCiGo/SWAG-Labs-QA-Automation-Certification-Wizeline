import { Selector, Role } from 'testcafe';
import { CREDENTIALS } from '../data/Constants';

const URL = 'https://www.saucedemo.com/';
const usernameField = Selector('input[name="user-name"]');
const passwordField = Selector('input[name="password"]');
const loginButton = Selector('input[value="LOGIN"]');

export const standardUserRole = Role(URL, async t => {
    await t.selectText(usernameField).pressKey('delete').typeText(usernameField, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_USERNAME, { paste: true });
    await t.selectText(passwordField).pressKey('delete').typeText(passwordField, CREDENTIALS.VALID_USER.SAUCEDEMO_VALID_PASSWORD, { paste: true });
    
    await t.click(loginButton);
}, { preserveUrl: true });