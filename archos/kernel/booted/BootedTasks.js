const TasksManager = require('../../Illuminate/Tasks/TasksManager');

/**
 * The booted tasks system class.
 */
class BootedTasks {
  /**
   * Load the developer tasks
   * 
   * @return {void}
   */
  _load__developerTasks() {
    require('../../../src/tasks/register/index.js');
  }

  /**
   * Start the tasks processes
   * 
   * @return {void}
   */
  start() {
    this._load__developerTasks();

    TasksManager._registered.forEach((Task) => {
      const task = new Task();
      task.run();
    });
  }
}

module.exports = BootedTasks;