const Controller = require('../../archos/Saved/Web/Controller');

/**
 * The archos libraries array
 *
 * @var {Array<string>}
 */
const archosLibraries = [
  //
];

/**
 * The external libraries array
 *
 * @var {Array<string>}
 */
const external = [
  //
];

/**
 * The Error404 controller class.
 */
class Error404 extends Controller {
  /**
   * Load the libraries for Error404 controller.
   *
   * @param {http.server.req} req
   * @return {this}
   */
  constructor(req) {
    super(
      archosLibraries,
      external,
      req
    );
  }

  /**
   * Boot the Error404 controller.
   *
   * @param {http.server.req} req
   * @return {void}
   */
  boot(_req) {
    this.customRes('<h1>HTTP 404 | The requested page does not exists</h1>', {
      'Content-Type': 'text/html',
    });
  }
}

module.exports = Error404
