const { exec } = require('child_process');

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
          console.error(errorMsg + ': ' + err);
          process.exit(1)
        }

        resolve(stdout);
      });
    });
  }
}

module.exports = new Sh()
