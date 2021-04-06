/**
 * Utility for manage global consts in the app
 */
class Consts {
  /**
   * The consts object
   * 
   * @private
   * @var {Object<string, any>}
   */
  _consts = {}

  /**
   * Fetch all consts
   * 
   * @public
   * @return {Object<string, any>}
   */
  fetchall() {
    return this._consts
  }

  /**
   * Set a const
   * 
   * @public
   * @param {string} key
   * @param {any} val
   * @return {void}
   */
  set(key, val) {
    this._consts[key] = val;
  }

  /**
   * Update a const
   * 
   * @param {string} key
   * @param {any} newVal
   * @return {void}
   */
  update(key, newVal) {
    if (!this._consts[key]) {
      throw `CONSTS: Invalid key: ${key} it doesn't exists`;
    }

    this._consts[key] = newVal;
  }

  /**
   * Get a const
   * 
   * @param {string} key
   * @param {any} defVal Default value
   * @return {any}
   */
  get(key, defVal=this._consts[key]) {
    return this._consts[key] || defVal;
  }
}

module.exports = new Consts()