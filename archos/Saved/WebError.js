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
    const Controller = this.$controller(req);
    const controller = new Controller(req);
    controller.boot(req);
    return controller._response;
  }
}

module.exports = WebError
