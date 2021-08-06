const router = require('../../archos/Saved/Router');
const { ApiRouter } = router;
const controller = require('../../archos/lib/controller');

/**
 * Register your api routes in this file, the routes
 * will be prefixed by the /api path prefix.
 * 
 * @example If your path is '/' the path is /api/
 * @example If your path is /hello/world/ the path is /api/hello/world/
 */

ApiRouter.get('/', () => controller.call("Api"));
ApiRouter.get('/hello', () => controller.call("HelloController"));
