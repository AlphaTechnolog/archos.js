const urls = require('./urls');
const WebError404 = require('./WebErrors/WebError404')

/**
 * The web errors utility class.
 */
class WebErrors {
  /**
   * The 404 verifications instance
   * 
   * @private
   * @var {WebError404}
   */
  webError404 = new WebError404()

  /**
   * Construct verification object.
   * 
   * @param {Object<string, string|Function<http.server.req>} register
   * @param {string} prefix
   * @return {Object<string, string|Function<http.server.req>}
   */
  constructVerificationObject(register, prefix='') {
    let newVerificationObject = {};

    Object.entries(register).forEach(([ path, meta ]) => {
      newVerificationObject[prefix + urls.fixLastBar(path)] = meta;
    });

    return newVerificationObject
  }
}

module.exports = new WebErrors();