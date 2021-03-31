const http = require('http');
const colors = require('colors');
const enviroment = require('../../lib/enviroment');
const log = require('../../lib/log');
const consts = require('../../lib/consts');
const urls = require('../../lib/urls');
const webErrors = require('../../lib/webErrors');

const Router = require('../../Illuminate/Router');
const { ViewRouter } = Router;
const { ApiRouter } = Router;

/**
 * The main kernel server entrypoint class
 */
class BootedKernel {
  /**
   * The server instance
   * 
   * @private
   * @var {http.server}
   */
  _server = null;

  /**
   * Booted kernel constructor
   * 
   * @return {this}
   */
  constructor() {
    this.make();
  }

  /**
   * Main class method
   * 
   * @return {void}
   */
  make() {
    enviroment.load(consts);
    this._createServer();
  }

  /**
   * Load the server views routes
   * 
   * @return {void}
   */
  _serverLoader__route__views() {
    require('../../../src/routes/views');
  }

  /**
   * Load the server api routes
   * 
   * @return {void}
   */
  _serverLoader__route__api() {
    require('../../../src/routes/api');
  }

  /**
   * Load the server routes
   * 
   * @return {void}
   */
  _loadServerRoutes() {
    this._serverLoader__route__views();
    this._serverLoader__route__api();
  }

  /**
   * Register the views routes
   * 
   * @param {http.server.req} req
   * @param {http.server.res} res
   * @return {void}
   */
  _serverCreater__register__views(req, res) {
    this._serverCreater__register__route(
      ViewRouter._register,
      req,
      res,
      '',
      'Views'
    );
  }

  /**
   * Register the api routes
   * 
   * @param {http.server.req} req
   * @param {http.server.res} res
   * @return {void}
   */
  _serverCreater__register__api(req, res) {
    this._serverCreater__register__route(
      ApiRouter._register,
      req,
      res,
      '/api',
      'Api'
    );
  }

  /**
   * Register the routes
   * 
   * @param {Object<string, string>} register
   * @param {http.server.req} req
   * @param {http.server.res} res
   * @return {void}
   */
  _serverCreater__register__route(register, req, res, prefix, name) {
    Object.entries(register).forEach(([ route, meta ]) => {
      const furl = urls.fixLastBar(req.url);
      const froute = urls.fixLastBar(route);

      if (
        furl === (prefix + froute) &&
        req.method.toLowerCase() === meta.method
      ) {
        log.info(
          `[${name}]: Requested address: ${prefix + route}, method: ${req.method.toUpperCase()}`
        );

        return res.end(meta.cb(req));
      }
    });
  }

  /**
   * Validate the server views routes
   * 
   * @param {http.server.req} req
   * @param {http.server.res} res
   * @return {void}
   */
  _createServer__validate__views(req, res) {
    this._serverCreater__register__views(req, res);
    this._serverCreater__register__api(req, res);
  }

  /**
   * Create the server
   * 
   * @return {void}
   */
  _createServer() {
    this._loadServerRoutes();

    this._server = http.createServer(async (req, res) => {
      const url = urls.fixLastBar(req.url);
      const newViewRouteRegister = webErrors.constructVerificationObject(ViewRouter._register);
      const newApiRouteRegister = webErrors.constructVerificationObject(ApiRouter._register, '/api');

      if (webErrors.webError404.existsRoute(
        newViewRouteRegister,
        newApiRouteRegister,
        url
      )) {
        return webErrors.webError404.dispatch404Error(res);
      }

      if (newViewRouteRegister[url]) {
        if (newViewRouteRegister[url].method !== req.method.toLowerCase()) {
          log.warning('The requested page doesn\'t exists')
          return res.end('<h1>Page not found 404</h1>')
        }
      }

      if (newApiRouteRegister[url]) {
        if (newApiRouteRegister[url].method !== req.method.toLowerCase()) {
          return webErrors.webError404.dispatch404Error(res);
        }
      }

      this._createServer__validate__views(req, res);
    });
  }

  /**
   * Start a server
   * 
   * @return {void}
   */
  start() {
    log.process('Booting the server')

    this._server.listen(consts.get('port'), () => {
      log.success(`Server booted at port ${consts.get('port')}`);
    });
  }
}

module.exports = BootedKernel