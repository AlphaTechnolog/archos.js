/**
 * The objects utils
 */
class UObject {
  /**
   * The object variable
   * 
   * @private
   * @var {Object<any, any>}
   */
  _object = {}

  /**
   * Constructor
   * 
   * @param {Object<any, any>}
   * @return {this}
   */
  constructor(object) {
    this.make(object);
  }

  /**
   * Main class method
   * 
   * @param {Object<any, any>}
   * @return {this}
   */
  make(object) {
    this._object = object;
  }

  /**
   * get the length
   * 
   * @get
   * @public
   * @return {int}
   */
  get length() {
    let objectArray = [];

    Object.entries(this._object).forEach(([ key, val ]) => {
      objectArray.push(key);
    });

    return objectArray.length;
  }
}

module.exports = UObject