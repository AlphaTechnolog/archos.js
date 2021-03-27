const colors = require('colors');

/**
 * The log class utility
 */
class Log {
  success(msg) {
    console.log(`[S]: ${msg}`.green.bold);
  }

  error(msg) {
    console.log(`[E]: ${msg}`.red.bold);
    process.exit(1);
  }

  process(msg) {
    console.log(`[P]: ${msg}`.yellow.bold);
  }

  info(msg) {
    console.log(`[I]: ${msg}`.blue.bold);
  }
}

module.exports = new Log()