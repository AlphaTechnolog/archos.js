const Task = require('../../archos/Illuminate/Tasks/Task');

/**
 * The archos libraries array.
 * 
 * @var {Array<string>}
 */
const archosLibraries = [
  'log',
  'consts'
];

/**
 * External libraries array.
 * 
 * @var {Array<string>}
 */
const external = [
  //
];

/**
 * Print hello class
 */
class PrintHello extends Task {
  constructor() {
    super(
      archosLibraries,
      external,
    )
  }

  run() {
    this.libs.log.info('Hello world from task file');
    this.libs.log.info('Port: ' + this.libs.consts.get('port'));
  }
}

module.exports = PrintHello