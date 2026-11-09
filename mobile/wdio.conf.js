const androidCapabilities = require('./config/capabilities.android.json');

exports.config = {
    runner: 'local',
    maxInstances: 1,
    specs: ['./test/specs/**/*.js'],
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    framework: 'mocha',
    mochaOpts: { timeout: 60000 },
    capabilities: [androidCapabilities],
    logLevel: 'info'
};