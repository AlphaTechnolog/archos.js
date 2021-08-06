const TasksManager = require('../../Saved/Tasks/TasksManager');

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
   * @return {Promise<void>}
   */
  async start() {
    this._load__developerTasks();

    for await (const Task of TasksManager._registered) {
      const task = new Task();
      await task.run();
    }
  }
}

module.exports = BootedTasks;