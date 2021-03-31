const log = require('../log');
const MWebError404 = require('../../../src/errors/404')

/**
 * The web error 404 utility class
 */
class WebError404 {
  /**
   * Validate if exists the route in verification object
   * 
   * @param {Object<string, string|Function<http.server.req>} viewVerificationObject
   * @param {Object<string, string|Function<http.server.req>} apiVerificationObject
   * @param {string} url
   */
  existsRoute(viewVerificationObject, apiVerificationObject, url) {
    return (
      !viewVerificationObject[url] &&
      !apiVerificationObject[url]
    );
  }

  /**
   * Dispatch the error 404 message
   * 
   * @param {http.server.res} res
   * @return {void}
   */
  dispatch404Error(res) {
    log.warning("The requested page doesn't exists");
    res.end(new MWebError404().run(res));
  }
}

module.exports = WebError404