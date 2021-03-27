const dotenv = require('dotenv');

// loading the enviroment using the `.env` file
dotenv.config({
  path: '.env'
});

/**
 * Utility to load the enviroment.
 */
class Enviroment {
  /**
   * The base enviroment object
   * 
   * @private
   * @var {Object<string, any>}
   */
  _enviromentObject = {
    port: process.env.APP_PORT || 3000
  }

  /**
   * load the enviroment using a consts utility
   * 
   * @param {Consts} consts
   * @return {void}
   */
  load(consts) {
    Object.entries(this._enviromentObject).forEach(([ key, val ]) => {
      consts.set(key, val);
    });
  }
}

module.exports = new Enviroment()