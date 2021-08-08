const WebError = require('../../archos/Saved/WebError');
const controller = require('../../archos/lib/controller');

/**
 * The 404 error class
 */
class WebError404 extends WebError {
  /**
   * The controller function
   *
   * @var {Function<http.server.req>}
   */
  $controller = (req) => controller.call(req, 'Error404');
}

module.exports = WebError404
