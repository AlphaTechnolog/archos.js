const http = require('http');
const colors = require('colors');
const enviroment = require('../lib/enviroment');
const log = require('../lib/log');
const consts = require('../lib/consts');

const Router = require('../Illuminate/Router');
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
    require('../../src/routes/views');
  }

  /**
   * Load the server api routes
   * 
   * @return {void}
   */
  _serverLoader__route__api() {
    require('../../src/routes/api');
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
    this._serverCreater__register__route(ViewRouter._register, req, res);
  }

  /**
   * Register the api routes
   * 
   * @param {http.server.req} req
   * @param {http.server.res} res
   * @return {void}
   */
  _serverCreater__register__api(req, res) {
    this._serverCreater__register__route(ApiRouter._register, req, res, '/api');
  }

  /**
   * Register the routes
   * 
   * @param {Object<string, string>} register
   * @param {http.server.req} req
   * @param {http.server.res} res
   * @return {void}
   */
  _serverCreater__register__route(register, req, res, prefix='/') {
    Object.entries(register).forEach(([ route, controller ]) => {
      if (req.url === (prefix + route)) {
        res.end(controller(req));
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

    this._server = http.createServer((req, res) => {
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

/**
 * The Archos.js kernel class
 */
class Kernel {
  /**
   * Start an archos application
   * 
   * @return {http.server}
   */
  boot() {
    return new BootedKernel();
  }
}

module.exports = new Kernel()