const router = require('../../archos/Saved/Router');
const { ApiRouter } = router;
const consts = require('../../archos/lib/consts');

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

ApiRouter.post('/my/api/post/route/', (req) => {
  const randomNumber = Math.floor(Math.random() * (10 + 1));
  return `RandomNumber: ${randomNumber}`;
});