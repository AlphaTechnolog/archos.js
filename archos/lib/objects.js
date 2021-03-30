const _Objects__Object = require('./Objects/Object');

/**
 * The objects utility class
 */
class Objects {
  Object(object) {
    return new _Objects__Object(object);
  }
}

module.exports = new Objects()