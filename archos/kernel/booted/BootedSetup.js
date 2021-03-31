const sh = require('../../lib/sh');
const { projectPath, cliPath } = require('../../lib/paths');

/**
 * The booted setup utility class.
 */
class BootedSetup {
  /**
   * The argv variable
   * 
   * @private
   * @var {Array<string>}
   */
  _argv = [];

  /**
   * The installation manager yarn|npm
   * 
   * @private
   * @var {string}
   */
  _manager = '';

  /**
   * Validate if the argv manager is diferent that npm & yarn
   * 
   * @return {boolean}
   */
  _validate__argv__invalidManager() {
    return (
      this._argv[0] !== 'yarn' &&
      this._argv[0] !== 'npm'
    )
  }

  /**
   * Validate the argv
   * 
   * @private
   * @return {void}
   */
  _validate__argv() {
    if (this._argv.length === 0) {
      log.error('Invalid argv please pass the manager: yarn|npm');
    }

    if (this._validate__argv__invalidManager()) {
      log.error('Invalid manager, please select yarn or npm');
    }

    this._manager = this._argv[0]; // npm|yarn
  }

  /**
   * Constructor (Execute the make function)
   * 
   * @param {Array<string>} argv
   * @return {this}
   */
  constructor(argv) {
    this.make(argv);
  }

  /**
   * This method create the argv, and validate it
   * 
   * @param {Array<string>} argv
   * @return {void}
   */
  make(argv) {
    this._argv = argv;
    this._validate__argv();
  }

  /**
   * Exec an installation order
   * 
   * @param {string} path
   * @param {string} manager
   * @return {Promise<void>}
   */
  async exec(path, manager) {
    const cmd = `cd ${path} && ${manager} install`;
    await sh.run(cmd);
  }

  /**
   * Run the setup.
   * 
   * @return {Promise<void>}
   */
  async run() {
    console.log('Installing project dependencies...');
    await this.exec(projectPath, this._manager);
    console.log('Installed project dependencies');
    console.log('Installing cli dependencies...');
    await this.exec(cliPath, this._manager);
    console.log('Installed cli dependencies');
    console.log('Your project has been setuped to work fine!');
  }
}

module.exports = BootedSetup