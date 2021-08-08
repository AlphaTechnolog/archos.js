const log = require('../log');
const webRoutes = require('../webRoutes');
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
   * @param {http.server.req} req
   * @return {Promise<void>}
   */
  async dispatch404Error(res, req) {
    log.unSeveralError("The requested page doesn't exists");
    log.warning('Request info')
    log.warning('------------')

    webRoutes.displayRequestInfo(req, ['url', 'method'], {
      logMethod: 'warning'
    });

    const controllerResponse = await (new MWebError404().run(req));

    for (const [key, val] of Object.entries(controllerResponse.headers)) {
      res.setHeader(key, val);
    }

    res.end(controllerResponse.end);
  }
}

module.exports = WebError404
