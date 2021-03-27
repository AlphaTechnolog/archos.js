const colors = require('colors');

/**
 * The log class utility
 */
class Log {
  /**
   * Show a success message (green)
   * 
   * @param {string} msg
   * @return {void}
   */
  success(msg) {
    console.log(`[S]: ${msg}`.green.bold);
  }

  /**
   * Show a error message (red)
   * 
   * @param {string} msg
   * @return {void}
   */
  error(msg) {
    console.log(`[E]: ${msg}`.red.bold);
    process.exit(1);
  }

  /**
   * Show a process message (yellow)
   * 
   * @param {string} msg
   * @return {void}
   */
  process(msg) {
    console.log(`[P]: ${msg}`.yellow.bold);
  }

  /**
   * Show a info message (blue)
   * 
   * @param {string} msg
   * @return {void}
   */
  info(msg) {
    console.log(`[I]: ${msg}`.blue.bold);
  }
}

module.exports = new Log()