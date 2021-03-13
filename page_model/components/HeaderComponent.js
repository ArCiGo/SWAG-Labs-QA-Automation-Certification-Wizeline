import { Selector, t } from 'testcafe';

class HeaderComponent {
    constructor() {
        this.burgerMenuButton = Selector('#react-burger-menu-btn');
    }

    // async clickBurgerMenuButton() {
    //     await t.click(this.burgerMenuButton);
    // }
}

export default new HeaderComponent();