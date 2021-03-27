/**
 * The base router class utility
 */
class BaseRouter {
  /**
   * The routes register
   * 
   * @private
   * @var {Object<string, string>}
   */
  _register = {}

  /**
   * Create a get route
   * 
   * @param {string} path
   * @param {Function<http.serverr.req>}
   */
  get(path, cb) {
    this._register[path] = cb;
  }
}

module.exports = BaseRouter