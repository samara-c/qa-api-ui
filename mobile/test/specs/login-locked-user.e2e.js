const { $ } = require('@wdio/globals');
const LoginPage = require('../pageobjects/LoginPage');

describe('My Demo App - Locked User Login', () => {
    it('should display an error when a locked user tries to login', async () => {
        await LoginPage.open();

        await LoginPage.login(
            'alice@example.com',
            '10203040'
        );

        const errorMessage = $(
            'id=com.saucelabs.mydemoapp.android:id/passwordErrorTV'
        );

        await errorMessage.waitForDisplayed({ timeout: 10000 });

        expect(await errorMessage.getText()).toBe(
            'Sorry this user has been locked out.'
        );
    });
});