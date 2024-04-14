const { newTaskCallback } = require('./new_task');

module.exports.register = (app) => {
  app.command('/add-task', newTaskCallback);
};