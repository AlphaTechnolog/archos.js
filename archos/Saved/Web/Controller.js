const stringsHelpers = require("../../lib/dataTypes__string");
const LibsImporter = require('../../lib/libsImporter');

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
   * Validate the rawRes serverResponse
   *
   * @param  {string} serverResponse
   * @return {void}
   */
  _validate__rawRes__serverResponse(serverResponse) {
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
  }

  /**
   * The server response with a raw text
   *
   * @param {any} serverResponse
   * @return {void}
   */
  rawRes(serverResponse) {
    this._validate__rawRes__serverResponse(serverResponse);
    
    this._response = {
      headers: {},
      end: stringsHelpers.fromOther(serverResponse),
    };
  }

  /**
   * Return's a customizable response.
   *
   * @param  {any} response
   * @param  {Object<string, any>} headers
   * @return {void}
   */
  customRes(res, headers) {
    this._validate__rawRes__serverResponse(res);

    this._response = {
      headers,
      end: stringsHelpers.fromOther(res),
    }
  }

  /**
   * Return's a json response.
   *
   * @param  {any} response
   * @return {void}
   */
  jsonRes(response) {
    this.customRes(response, {
      "Content-Type": "application/json",
    });
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
      return;
    }

    const archosLibrariesImporter = new LibsImporter(this.archosLibs.map(
      lib => ({
        ...lib,
        import: './' + lib.import
      })
    ));

    const librariesImporter = new LibsImporter(this.externalLibs);

    for (const [libraryName, library] of Object.entries(archosLibrariesImporter.librariesObject)) {
      this.libs[libraryName] = library;
    }

    for (const [libraryName, library] of Object.entries(librariesImporter.librariesObject)) {
      this.libs[libraryName] = library;
    }
  }
}

module.exports = Controller;
