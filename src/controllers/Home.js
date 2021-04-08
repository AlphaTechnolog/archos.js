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
 * The home controller
 */
class Home extends Controller {
  /**
   * Constructor
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
   * Boot the controller
   *
   * @param {http.server.req} req
   * @return {void}
   */
  boot(req) {
    this.rawRes('<h1>Hello, World!</h1>');
  }
}

module.exports = Home
