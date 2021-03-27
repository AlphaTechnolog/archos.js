const router = require('../../archos/Illuminate/Router');
const { ViewRouter } = router;

ViewRouter.get('', (req) => {
  return 'hello world from the views file';
});