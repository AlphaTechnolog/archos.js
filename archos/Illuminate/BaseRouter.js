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
   * Register a route.
   * 
   * @param {string} path
   * @param {Function<http.server.req>} cb
   * @param {string} method
   * @return {void}
   */
  _register__method(path, cb, method) {
    this._register[path] = {
      path,
      cb,
      method,
    };
  }
   
  /**
   * Create a get route
   * 
   * @param {string} path
   * @param {Function<http.server.req>}
   */
  get(path, cb) {
    this._register__method(
      path,
      cb,
      'get'
    );
  }

  /**
   * Create a post route
   * 
   * @param {string} path
   * @param {Function<http.server.req>}
   */
  post(path, cb) {
    this._register__method(
      path,
      cb,
      'post'
    )
  }

  /**
   * Create a put route
   * 
   * @param {string} path
   * @param {Function<http.server.req>}
   */
  put(path) {
    this._register__method(
      path,
      cb,
      'put'
    )
  }

  /**
   * Create a delete route
   * 
   * @param {string} path
   * @param {Function<http.server.req>}
   */
  delete(path) {
    this._register__method(
      path,
      cb,
      'delete'
    )
  }
}

module.exports = BaseRouter