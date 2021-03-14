import dotenv from 'dotenv';
dotenv.config();

const CREDENTIALS = {
    VALID_USER: {
        SAUCEDEMO_VALID_USERNAME: process.env.SAUCEDEMO_VALID_USERNAME,
        SAUCEDEMO_VALID_PASSWORD: process.env.SAUCEDEMO_VALID_PASSWORD
    },
    INVALID_USER: {
        SAUCEDEMO_INVALID_USERNAME: process.env.SAUCEDEMO_INVALID_USERNAME,
        SAUCEDEMO_INVALID_PASSWORD: process.env.SAUCEDEMO_INVALID_PASSWORD
    }
};
const INVENTORY_ITEMS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
const CHECKOUT_INFO = ['Armando', 'Cifuentes', '60000'];

export {
    CREDENTIALS, INVENTORY_ITEMS, CHECKOUT_INFO
};