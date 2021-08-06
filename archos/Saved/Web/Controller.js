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
   * Return an html response
   *
   * @param {string} res The html to render
   */
  htmlRes(res) {
    this.customRes(res, {
      'Content-Type': 'text/html',
    });
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
    this._constructLibs();
  }

  /**
   * Construct and validate the libs
   *
   * @private
   * @return {void}
   */
  _constructLibs() {
    const archosLibrariesImporter = LibsImporter.make(this.archosLibs, './');
    const librariesImporter = LibsImporter.make(this.externalLibs);

    this.libs = {
      ...archosLibrariesImporter.librariesObject,
      ...librariesImporter.librariesObject,
    };
  }
}

module.exports = Controller;
