const router = require('../../archos/Illuminate/Router');
const { ViewRouter } = router;

/**
 * Register your views in this file.
 * The addresses doesn't contain a prefix, it is raw path
 * 
 * @example If your route is '' the route path is: '/'
 * @example If your route is /hello/world the route path is: '/hello/world'
 */

ViewRouter.get('/', (req) => {
  return '<h1>View route</h1>';
});