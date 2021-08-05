const sh = require('../../lib/sh');
const { question, confirm } = require('../../lib/confirm')

/**
 * Define a customLogger because dependencies problems
 */
class CustomLog {
  /**
   * Show a success message.
   * @param {string} message
   * @returns {void}
   */
  success (message) {
    console.log(`[S]: ${message}`)
  }

  /**
   * Show a process message.
   * @param {string} message
   * @returns {void}
   */
  process (message) {
    console.log(`[P]: ${message}`)
  }
}

const log = new CustomLog()

/**
 * Show an error in stderr and exit with status code 1
 * @param {string} message
 * @returns {void}
 */
const error = (message) => {
  console.error(message)
  process.exit(1)
}


/**
 * Main method
 * @returns {Promise<void>}
 */
const main = async () => {
  if (process.argv.length !== 3) {
    error('Invalid project name')
  }

  const projectName = process.argv[2];

  log.process('Cloning repository...')

  await sh.run(`git clone https://github.com/AlphaTechnolog/archos.js.git ${projectName}`)

  log.success('OK')
  log.process('Installing dependencies...')

  let dependencyManager = await question(
    'What dependency manager do you like to use yarn or npm? '
  )

  while (dependencyManager !== 'yarn' && dependencyManager !== 'npm') {
    dependencyManager = await question(
      'Choose a valid dependency manager yarn or npm: '
    )
  }

  const implementGit = await confirm('Do you want to implement git on your project')

  if (implementGit) {
    await sh.run(`cd ./${projectName} && ${dependencyManager} install && node ./setupProject ${dependencyManager} && rm -rf .git && git init`)
  } else {
    await sh.run(`cd ./${projectName} && ${dependencyManager} install && node ./setupProject ${dependencyManager} && rm -rf .git`)
  }

  log.success('Project created successfully, to start read this guide: https://github.com/AlphaTechnolog/archos.js')
};

main();
