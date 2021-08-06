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
   * @param {string} methodName
   * @return {Archos/Saved/Web/Controller}
   */
  call(req, name, methodName = "main") {
    if (!name) {
      throw 'Invalid controller call';
    }

    const controllerPath = path.join(
      paths.controllersPath,
      name + '.js'
    );

    const Controller = require(controllerPath);
    const controller = new Controller(req);
    controller[methodName](controller.req);

    return controller;
  }
}

module.exports = new Controller();
