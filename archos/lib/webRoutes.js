const log = require('./log')

/**
 * The web routes utilities class.
 */
class WebRoutes {
  /**
   * Display a more friendly request info
   * 
   * @param {http.server.req} req
   * @param {Array<string>} toShow
   * @param {Object<string, string>} options
   * @return {void}
   */
  displayRequestInfo(req, toShow=[], options={ logMethod: 'info' }) {
    if (toShow.length === 0) {
      return;
    }

    // Verificating if the req object doesn't contain
    // a requested key in the toShow keys array.
    toShow.forEach(toValidate => {
      if (!toValidate in req) {
        throw `The solicitated key: "${toValidate}" doesn't exists in the req object`;
      }
    });

    // Eaching the request object in search of the
    // keys requested in the `theShow` array, then show it info
    // using the friendly and better library `log`.
    toShow.forEach((toShowItem) => {
      log[options.logMethod](`*~${toShowItem}~> ${req[toShowItem]}`);
    });
  }
}

module.exports = new WebRoutes();