const WebError = require('../../archos/Saved/WebError');

/**
 * The 404 error class
 */
class WebError404 extends WebError {
  /**
   * The controller function
   * 
   * @var {Function<http.server.req>}
   */
  $controller = (req) => '<h1>Page not found: 404</h1>'
}

module.exports = WebError404