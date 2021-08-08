const fs = require('fs');
const mime = require('mime-types');
const path = require('path');
const stringsHelpers = require("../../lib/dataTypes__string");
const LibsImporter = require('../../lib/libsImporter');
const paths = require('../../lib/paths')
const log = require('../../lib/log');

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
   * Render a file into the response
   * 
   * @param {string} filepath
   * @return {void}
   */
  render(filepath) {
    if (!fs.existsSync(filepath)) {
      log.error('Invalid file path, no such file or directory');
    }

    const content = fs.readFileSync(filepath).toString();

    this.customRes(content, {
      'Content-Type': mime.contentType(path.extname(filepath))
    });
  }

  /**
   * Render a view from the src/views directory.
   * 
   * @param {string} viewName
   * @return {void}
   */
  renderView(viewName) {
    this.render(path.join(
      paths.viewsDirectory,
      viewName
    ));
  }

  /**
   * Return an html response
   *
   * @param {string} res The html to render
   * @return {void}
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
