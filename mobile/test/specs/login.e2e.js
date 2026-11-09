const { $ } = require('@wdio/globals');
const LoginPage = require('../pageobjects/LoginPage');

describe('My Demo App - Login', () => {
    it('should login successfully with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login(
            'bod@example.com',
            '10203040'
        );

        const productsTitle = $(
            'id=com.saucelabs.mydemoapp.android:id/productTV'
        );

        await productsTitle.waitForDisplayed({ timeout: 15000 });

        expect(await LoginPage.verifyLoggedIn()).toBe(true);
    });
});