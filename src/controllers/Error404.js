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
   * The main method for the Error404 controller.
   *
   * @param {http.server.req} _req
   * @return {void}
   */
  main(_req) {
    this.renderView('errors/404.html', {
      title: 'Error 404'
    });
  }
}

module.exports = Error404
