const { $, driver } = require('@wdio/globals');

const APP_ID = 'com.saucelabs.mydemoapp.android';

class LoginPage {
    get menuButton() {
        return $('~View menu');
    }

    get logoutConfirmationButton() {
    return $('id=android:id/button1');
}

    get loginOption() {
        return $('~Login Menu Item');
    }

    get loginTitle() {
        return $(`id=${APP_ID}:id/loginTV`);
    }

    get usernameInput() {
        return $(`id=${APP_ID}:id/nameET`);
    }

    get passwordInput() {
        return $(`id=${APP_ID}:id/passwordET`);
    }

    get loginButton() {
        return $(`id=${APP_ID}:id/loginBtn`);
    }

    get logoutOption() {
        return $('~Logout Menu Item');
    }

    async open() {
        await this.menuButton.waitForDisplayed({ timeout: 15000 });
        await this.menuButton.click();

        await this.loginOption.waitForDisplayed({ timeout: 10000 });
        await this.loginOption.click();

        await this.loginTitle.waitForDisplayed({ timeout: 10000 });
        await this.usernameInput.waitForDisplayed({ timeout: 10000 });
    }

    async logout() {
    await this.menuButton.waitForDisplayed({
    timeout: 45000,
    interval: 1000
});
    await this.menuButton.click();

    await this.logoutOption.waitForDisplayed({ timeout: 10000 });
    await this.logoutOption.click();

    await this.logoutConfirmationButton.waitForDisplayed({
        timeout: 10000
    });

    await this.logoutConfirmationButton.click();

    await this.loginTitle.waitForDisplayed({ timeout: 15000 });
}

async verifyLoggedOut() {
    await this.menuButton.click();

    await this.loginOption.waitForDisplayed({ timeout: 10000 });

    return await this.loginOption.isDisplayed();
}

    async dismissKeyboard() {
        try {
            await driver.hideKeyboard();
        } catch (error) {
           
        }
    }

    async login(username, password) {
    await this.usernameInput.waitForDisplayed({ timeout: 15000 });
    await this.usernameInput.setValue(username);

    await this.passwordInput.waitForDisplayed({ timeout: 15000 });
    await this.passwordInput.setValue(password);

    await this.loginButton.waitForDisplayed({ timeout: 15000 });
    await this.loginButton.click();
}
    async verifyLoggedIn() {
        await this.menuButton.waitForDisplayed({ timeout: 15000 });
        await this.menuButton.click();

        await this.logoutOption.waitForDisplayed({ timeout: 10000 });

        return await this.logoutOption.isDisplayed();
    }
}

module.exports = new LoginPage();