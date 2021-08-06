const Maker = require('../Maker');
const path = require('path');
const paths = require('../../../lib/paths');
const log = require('../../../lib/log')
const reference = require('../../../lib/references');

/**
 * The task make
 */
class Task extends Maker {
  /**
   * The reference file path
   * 
   * @var {string}
   */
  $reference = path.join(
    __dirname,
    '..',
    'references',
    'task.reference'
  )

  /**
   * The task register file reference path
   * 
   * @var {string}
   */
  $registerReference = path.join(
    __dirname,
    '..',
    'references',
    'tasksRegister.reference',
  )

  /**
   * Validate the argv
   * 
   * @return {void}
   */
  validate() {
    //
  }

  /**
   * The main task maker function
   * 
   * @return {void}
   */
  async run() {
    const taskPath = path.join(paths.tasksPath, this._argv.name + '.js');
    const registerTaskFile = paths.registerTasksFile;

    if (await paths.exists(taskPath)) {
      log.error('The task already exists');
    }

    if (! await paths.exists(registerTaskFile)) {
      log.error('The register tasks file doesn\'t exists');
    }

    const tasksRegisterReference = await reference.processReference(
      this.$registerReference,
      this._argv
    );

    log.process('Registering the task');

    await reference.append(
      registerTaskFile,
      tasksRegisterReference,
      true
    );

    log.success('Registered the task successfully!');
    log.process('Creating task');

    const taskReference = await reference.processReference(
      this.$reference,
      this._argv
    );

    await reference.newFile(
      taskPath,
      taskReference
    );

    log.success('Task created successfully!');
  }
}

module.exports = Task