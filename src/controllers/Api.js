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
 * The api controller
 */
class Api extends Controller {
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
   * The main method for the Api Controller
   *
   * @param {http.server.req} req
   * @return {void}
   */
  main(req) {
    this.jsonRes([
      { name: "Joe" },
      { name: "Gabriel" },
    ]);
  }
}

module.exports = Api
