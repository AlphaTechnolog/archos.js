const BootedTasks = require('./booted/BootedTasks');
const BootedKernel = require('./booted/BootedKernel');
const BootedCli = require('./booted/BootedCli');
const BootedSetup = require('./booted/BootedSetup');

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

  /**
   * Boot the cli system
   * 
   * @param {any} yargs
   * @return {BootedCli}
   */
  bootCli(yargs) {
    return new BootedCli(yargs);
  }

  /**
   * Boot the setup system
   * 
   * @param {Array<string>} argv
   * @return {BootedSetup}
   */
  bootSetup(argv) {
    return new BootedSetup(argv);
  }
}

module.exports = new Kernel()
