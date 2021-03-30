const { exec } = require('child_process');
const log = require('./log');

/**
 * The sh class utility
 */
class Sh {
  /**
   * Run a sh command
   * 
   * @param {string} cmd
   * @param {string} errorMsg
   * @return {Promise<string>}
   */
  run(cmd, errorMsg='Error at execute a command') {
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          log.error(errorMsg + ': ' + err);
        }

        if (stderr) {
          log.error(errorMsg + ': ' + stderr);
        }

        resolve(stdout);
      });
    });
  }
}

module.exports = new Sh()