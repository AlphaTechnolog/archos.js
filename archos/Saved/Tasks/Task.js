/**
 * The task utility
 */
class Task {
  /**
   * The libs object
   * 
   * @var {Object<string, any>}
   */
  libs = {}

  /**
   * Constructor
   * 
   * @param {Array<string>} archosLibraries
   * @param {Array<string>} externalLibraries
   * @return {this}
   */
  constructor(archosLibraries, external) {
    this.make(archosLibraries, external);
  }

  /**
   * Load the archos libraries
   * 
   * @private
   * @return {void}
   */
  _load__archosLibraries() {
    this.archosLibraries.forEach((name) => {
      this.libs[name] = require('../../lib/' + name);
    });
  }

  /**
   * Load the external libraries
   * 
   * @private
   * @return {void}
   */
  _load__externalLibraries() {
    this.external.forEach((name) => {
      this.libs[name] = require(name);
    });
  }

  /**
   * Main method
   * 
   * @return {void}
   */
  make(archosLibraries, external) {
    this.archosLibraries = archosLibraries;
    this.external = external;
    this._load__archosLibraries();
    this._load__externalLibraries();
  }
}

module.exports = Task