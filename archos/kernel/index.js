const BootedTasks = require('./booted/BootedTasks');
const BootedKernel = require('./booted/BootedKernel');

/**
 * The Archos.js kernel class
 */
class Kernel {
  /**
   * Start an archos application
   * 
   * @return {BootedKernel}
   */
  boot() {
    return new BootedKernel();
  }

  /**
   * Boot the tasks system
   * 
   * @return {BootedTasks}
   */
  bootTasks() {
    return new BootedTasks();
  }
}

module.exports = new Kernel()