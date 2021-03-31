const router = require('../../archos/Saved/Router');
const { ApiRouter } = router;

/**
 * Register your api routes in this file, the routes
 * will be prefixed by the /api path prefix.
 * 
 * @example If your path is '/' the path is /api/
 * @example If your path is /hello/world/ the path is /api/hello/world/
 */

ApiRouter.get('/', (req) => {
  return 'api route';
});