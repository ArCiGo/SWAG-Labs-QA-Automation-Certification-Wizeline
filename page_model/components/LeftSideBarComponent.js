import { Selector, t } from 'testcafe';

class LeftSideBarComponent {
    constructor() {
        this.logoutLinkButton = Selector('#logout_sidebar_link');
    }

    // async clickLogoutLinkButton() {
    //     await t.click(this.logoutLinkButton);
    // }
}

export default new LeftSideBarComponent();