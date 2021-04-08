/**
 * The controller class utility
 */
class Controller {
  /**
   * The response options object
   *
   * @private
   * @var {Object<string, any>}
   */
  _response = {}
  
  /**
   * The libs array
   *
   * @var {Array<any>}
   */
  libs = [];
  
  /**
   * Constructor
   *
   * @param {Array<string>} archosLibs
   * @param {Array<string>} externalLibs
   * @param {http.server.req} req
   * @return {this}
   */
  constructor(archosLibs, externalLibs, req) {
    this.make(
      archosLibs,
      externalLibs,
      req
    );
  }
  
  /**
   * The server response with a raw text
   *
   * @param {string} serverResponse
   * @return {void}
   */
  rawRes(serverResponse) {
    // Required serverResponse if it doesn't passed
    // the app crashes inmediatelly
    const validators = [
      undefined,
      null,
      '',
      0,
      false,
      true,
    ];

    if (validators.includes(serverResponse)) {
      // CRASH!!! BOOM... XD
      throw `Invalid serverResponse, waiting a string, passed: ${
        serverResponse
      }, type: ${typeof(serverResponse)}`;
    }
    
    const processer = r => {
      if (typeof(r) !== 'string') {
        r = JSON.stringify(r);
      }
      
      return r;
    }
    
    this._response = {
      type: 'raw',
      end: processer(serverResponse),
    };
  }
  
  /**
   * Save the data in this instance
   *
   * @param {Array<string>} archosLibs
   * @param {Array<string>} externalLibs
   * @param {http.server.req} req
   * @return {void}
   */
  make(archosLibs, externalLibs, req) {
    this.archosLibs = archosLibs;
    this.externalLibs = externalLibs;
    this.req = req;

    // Executing the `_constructLibs` method to
    // get and validate all libraries and save it to
    // this instance.
    this._constructLibs();
  }
  
  /**
   * Construct the archos libs
   *
   * @private
   * @return {void}
   */
  _constructLibs__archos() {
    this.archosLibs.forEach(toImport => {
      const basePath = '../../lib';
      this.libs[toImport] = require(`${basePath}/${toImport}.js`)
    });
  }
  
  /**
   * Construct the external libs
   *
   * @private
   * @return {void}
   */
  _constructLibs__external() {
    this.externalLibs.forEach((toImport) => {
      this.libs[toImport] = require(toImport);
    });
  }
  
  /**
   * Construct and validate the libs
   *
   * @private
   * @return {void}
   */
  _constructLibs() {
    if (
      this.archosLibs.length === 0 &&
      this.externalLibs.length === 0
    ) {
      // Termining the session for performance
      // reason, why realize the process over up a
      // empty array?.
      return;
    }
    
    this._constructLibs__archos();
    this._constructLibs__external();
  }
}

module.exports = Controller;
