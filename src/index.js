/**
 * Main app file, doesn't edit this file this file
 * is the entrypoint loader for the archos kernel,
 * don't change a const name of function name or
 * requires paths, etc.
 */

/**
 * If you want to register a function or other process
 * realize if task in the file: src/tasks/TASKNAME, the
 * TASKNAME path is the file (.js) name it task does
 * register in the src/tasks/register/index.js.
 */

const kernel = require('../archos/kernel');
const entry = kernel.boot();
const tasks = kernel.bootTasks();

(async () => {
  await tasks.start();
  entry.start();
})();