const Task = require('../../archos/Illuminate/Tasks/Task');

/**
 * Print hello class
 */
class PrintHello extends Task {
  constructor() {
    const archosLibraries = [
      'log'
    ];

    const externalLibraries = [
      //
    ];

    super(archosLibraries, externalLibraries);
  }

  run() {
    this.libs.log.success('task hello world from archos log');
  }
}

module.exports = PrintHello