const path = require('path');
const paths = require('./paths')

/**
 * The controller class utility.
 */
class Controller {
  /**
   * Get a controller class and return it class.
   *
   * @param {string} name
   * @return {Archos/Saved/Web/Controller}
   */
  call(name) {
    if (!name) {
      throw 'Invalid controller call';
    }

    const controllerPath = path.join(
      paths.controllersPath,
      name + '.js'
    );

    return require(controllerPath);
  }
}

module.exports = new Controller();
