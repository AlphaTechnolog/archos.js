/**
 * The web error class utility
 */
class WebError {
  /**
   * Run the error
   *
   * @param {http.server.req} req
   * @return {Promise<string>}
   */
  async run(req) {
    const controller = await this.$controller(req);
    return controller._response;
  }
}

module.exports = WebError
