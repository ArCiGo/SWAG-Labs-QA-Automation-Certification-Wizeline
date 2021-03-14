import { Selector, t } from 'testcafe';

class HeaderComponent {
    constructor() {
        this.burgerMenuButton = Selector('#react-burger-menu-btn');
    }
}

export default new HeaderComponent();