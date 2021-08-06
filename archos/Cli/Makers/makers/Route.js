const Maker = require('../Maker');
const log = require('../../../lib/log');
const paths = require('../../../lib/paths');
const references = require('../../../lib/references');
const path = require('path');
const fs = require('fs');

/**
 * The route maker
 */
class Route extends Maker {
  /**
   * Reference file path
   *
   * @var {string}
   */
  get $reference() {
    return path.join(__dirname, '..', 'references', 'route.reference');
  }

  /**
   * Validate the argv
   *
   * @return {void}
   */
  validate() {
    if (!this._argv.method) {
      log.error('Invalid method, select get, delete, post or put');
    }

    if (!this._argv.type) {
      log.error('Invalid type, please select view or api');
    }

    if (
      this._argv.method.toLowerCase() !== 'get' &&
      this._argv.method.toLowerCase() !== 'post' &&
      this._argv.method.toLowerCase() !== 'put' &&
      this._argv.method.toLowerCase() !== 'delete'
    ) {
      log.error('Invalid method, select get, delete, post or put');
    }

    if (
      this._argv.type.toLowerCase() !== 'view' &&
      this._argv.type.toLowerCase() !== 'api'
    ) {
      log.error('Invalid type, please select view or api');
    }
  }

  /**
   * Get the controller name.
   *
   * @returns {string}
   */
  getControllerName() {
    let name = this._argv.name.split('/');
    name = name[1];
    name = name.split('_');
    name = [...name.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    })];
    name = name.join('');
    name = name + 'Controller';

    return name;
  }

  /**
   * Get the controller method.
   *
   * @returns {string}
   */
  getControllerMethod() {
    let method = this._argv.name.split('/');
    method = method[method.length - 1];
    method = method.split('_');
    method = [...method.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    })];
    method[0] = method[0].toLowerCase();
    method = method.join('');

    return method;
  }

  /**
   * The main route function
   *
   * @return {void}
   */
  async run() {
    const routesDir = paths.src('routes');

    if (!await paths.exists(routesDir)) {
      log.error('No such file or directory: ' + routesDir);
    }

    const name = this.getControllerName();
    const method = this.getControllerMethod();

    const reference = await references.processReference(
      this.$reference,
      {
        ...this._argv,
        controller: name,
        router: this._argv.type.toLowerCase() === 'api' ? 'ApiRouter' : 'ViewRouter',
        methodName: method
      }
    );

    const routerFile = path.join(
      routesDir,
      (this._argv.type.toLowerCase() === 'view' ? 'views' : 'api') + '.js'
    );

    await references.append(
      routerFile,
      reference,
      false
    );

    log.success('Route maked successfully!');
  }
}

module.exports = Route
