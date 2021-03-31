const BaseRouter = require('./BaseRouter');

class ViewRouter extends BaseRouter { };
class ApiRouter extends BaseRouter { };

/**
 * The main router class
 */
class Router {
  /**
   * ViewRouter instance
   * 
   * @public
   * @var {ViewRouter}
   */
  ViewRouter = new ViewRouter();

  /**
   * ApiRouter instance
   * 
   * @public
   * @var {ApiRouter}
   */
  ApiRouter = new ApiRouter();
}

module.exports = new Router()