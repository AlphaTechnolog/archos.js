/**
 * The base maker utility
 */
class Maker {
  /**
   * The argv variable
   * 
   * @private
   * @var {Object<string, string|Array<any>>}
   */
  _argv = {}

  /**
   * The argc variable
   * 
   * @private
   * @var {int}
   */
  _argc = 0

  /**
   * Constructor
   * 
   * @param {Object<string, string|Array<any>>} argv
   * @param {int} argc
   * @return {void}
   */
  constructor(argv, argc) {
    this.make(argv, argc);
  }

  /**
   * Main maker method
   * 
   * @param {Object<string, string|Array<any>>} argv
   * @param {int} argc
   * @return {void}
   */
  make(argv, argc) {
    this._argv = argv;
    this._argc = argc;
    this.validate();
  }
}

module.exports = Maker