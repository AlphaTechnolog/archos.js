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
   * Show a error message (red) and exit.
   * 
   * @param {string} msg
   * @return {void}
   */
  error(msg) {
    console.log(`[E]: ${msg}`.red.bold);
    process.exit(1);
  }

  /**
   * Show a error message (red) without exit.
   * 
   * @param {string} msg
   * @return {void}
   */
  unSeveralError(msg) {
    console.log(`[E]: ${msg}`.red.bold);
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

  /**
   * Show a warning message (magenta)
   * 
   * @param {string} msg
   * @return {void}
   */
  warning(msg) {
    console.log(`[W]: ${msg}`.magenta.bold);
  }
}

module.exports = new Log()