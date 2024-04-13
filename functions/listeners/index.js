const eventsListener = require('./events');
const commandsListener = require('./commands');

module.exports.registerListeners = (app) => {
    eventsListener.register(app);
    commandsListener.register(app);

};
