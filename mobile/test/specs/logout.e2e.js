const LoginPage = require('../pageobjects/LoginPage');

describe('My Demo App - Logout', () => {
    it('should logout successfully after a valid login', async () => {
        await LoginPage.open();

        await LoginPage.login(
            'bod@example.com',
            '10203040'
        );

        await LoginPage.logout();

        expect(await LoginPage.verifyLoggedOut()).toBe(true);
    });
});