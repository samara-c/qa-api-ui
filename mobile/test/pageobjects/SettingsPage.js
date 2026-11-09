const { driver } = require('@wdio/globals');
class SettingsPage {

    async open() {
        await driver.activateApp('com.android.settings');
    }

    async getCurrentPackage() {
        return await driver.getCurrentPackage();
    }

}

module.exports = new SettingsPage();
