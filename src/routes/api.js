const router = require('../../archos/Illuminate/Router');
const { ApiRouter } = router;

ApiRouter.get('', (req) => {
  return 'api route';
});