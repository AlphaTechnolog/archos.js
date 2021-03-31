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
    return this.$controller(req);
  }
}

module.exports = WebError