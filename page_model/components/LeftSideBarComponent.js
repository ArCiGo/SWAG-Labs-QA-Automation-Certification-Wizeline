import { Selector, t } from 'testcafe';

class LeftSideBarComponent {
    constructor() {
        this.logoutLinkButton = Selector('#logout_sidebar_link');
    }
}

export default new LeftSideBarComponent();