/**
 * The web urls utility class.
 */
class Urls {
  /**
   * Fix the problems with the last var in url
   * 
   * @param {string} path
   * @return {string}
   */
  fixLastBar(path) {
    const splitedPath = path.split('/');

    if (
      splitedPath[splitedPath.length - 1] === '' &&
      splitedPath.length > 1
    ) {
      splitedPath.pop();
    }

    return splitedPath.join('/');
  }
}

module.exports = new Urls()