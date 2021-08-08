/**
 * The web error class utility
 */
class WebError {
  /**
   * Run the error
   *
   * @param {http.server.req} req
   * @return {string}
   */
  run(req) {
    const controller = this.$controller(req);
    return controller._response;
  }
}

module.exports = WebError
