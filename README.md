# archos.js

Archos provide a functions and classes to work in your http complete application
using node.js

## dependencies

The dependencies for the project are:

- nodemon (dev)
- colors
- dotenv

## creating first app

To create an app with archos.js use the following commands:

### Cloning

```sh
git clone https://github.com/AlphaTechnolog/archos.js.git myapp
cd myapp
```

### Installing dependencies

```sh
yarn # or npm install
```

### Running scripts

#### Start

Start a web server without dev reloading (nodemon)

```sh
yarn start # or npm run start
```

#### Dev

Start a web server using the dev reloading (nodemon)

```sh
yarn dev # or npm run dev
```

## files

The files to create your app are:

- src/tasks/**
- src/tasks/register/**
- src/routes/**

### src/tasks/**

In the these folder you must create various scripts, it scripts will be created
before start the web server. If you need to create a task you must create the next
code:

```sh
cd myapp/src/tasks
touch printHello.js
nvim printHello.js
```

```javascript
const Task = require('../../archos/Illuminate/Tasks/Task');

/**
 * The archos libs array.
 * archos libraries are located in `archos/lib/**`
 * 
 * @var {Array<string>}
 */
const archosLibraries = [
  'log',
  'consts'
];

/**
 * The external libraries array.
 * 
 * @var {Array<string>}
 */
const libs = [
  'dotenv',
];

/**
 * Print hello task.
 */
class PrintHello extends Task {
  /**
   * The task constructor
   * 
   * @return {this}
   */
  constructor() {
    super(
      archosLibraries,
      libs
    );
  }

  /**
   * The main task method
   * 
   * @return {void}
   */
  run() {
    this.libs.log.success('Task hello world from the archos log');
    this.libs.dotenv.config({ path: '.env' });
    this.libs.log.info('The port are: ' + process.env.APP_PORT || 3000);

    // The consts library provide the full global
    // files consts api to manage your global consts
    // in it storage the port of app is registered
    // with the enviroment library.

    this.libs.log.info('[CONSTS]: Port: ' + this.libs.consts.get('port'));
  }
}
```

### src/tasks/register/index.js

The it file you watch the next code:

```javascript
const TasksManager = require('../../../archos/Illuminate/Tasks/TasksManager');

/**
 * In this file you will register the tasks to execute
 * before start and create the web server
 * 
 * @example TasksManager.register(require('../TAKSNAME'))
 */
```

You want to register the tasks, to register the before
created task named `printHello.js` use:

```javascript
TasksManager.register(require('../printHello'));
```

All tasks will be executed in the register order
if you register two tasks: `printHello`, `printPort`
and you register as this:

```javascript
TasksManager.register(require('../printHello'));
TasksManager.register(require('../printPort'));
```

The `yarn start` command output is:

```
[I]: Hello world from the task
[I]: The port is 3000
[P]: Booting the server
[S]: Server booted at port 3000
```

### src/routes/views.js

In this file you will be register the views of
your files without any prefix (raw routes), example:
If your route is '' the route is: '/', if your
route is 'hello/world' the route is: '/hello/world'.
Code example:

```javascript
const { ViewRouter } = require('../../archos/Illuminate/Router')

/**
 * Register your views in this file.
 * The addresses doesn't contain a prefix, it is raw path
 *
 * @example If your route is '' the route path is: '/'
 * @example If your route is /hello/world the route path is: '/hello/world'
 */

ViewRouter.get('', (req) => {
  const randomNumber = Math.floor(Math.random() * (10 + 1));
  const { url } = req;
  return `RandomNumber: ${randomNumber}\nUrl: ${url}`
});
```

In your / route (in your web browser) you will be receive the
next response:

```
RandomNumber: 1|2|3|4|5|6|7|8|9|10
Url: /
```

### src/routes/api.js

In this file you will be register the api routes prefixed with the
/api prefix, example if your route is '' your route is '/api/', if
your route is 'hello/world/' your route is '/api/hello/world/'.
Code example:

```javascript
const router = require('../../archos/Illuminate/Router');
const { ApiRouter } = router;

/**
 * Register your api routes in this file, the routes
 * will be prefixed by the /api path prefix.
 *
 * @example If your path is '' the path is /api/
 * @example If your path is /hello/world the path is /api/hello/world
 */

ApiRouter.get('', (req) => {
  return req.url + '\nApi route!';
});
```

In your web browser in the route '/api/' the browser receive the next
output:

```
/api/
Api Route!
```

## Enjoy

Thanks for use archos.js this "framework" is in development, but it,
not exists post router method, put, delete only get, doesn't exists
the controller etc. Enjoy!