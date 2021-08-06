/**
 * Make a question using readline.
 * @param {string} message
 * @returns {Promise<string>}
 */
const question = (message) => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve, reject) => {
    readline.question(message, (response) => {
      readline.close()
      resolve(response)
    })
  })
}

/**
 * Define a cli confirm.
 * @param {string} message
 * @param {boolean} defaultValue (default true)
 * @returns {Promise<boolean>}
 */
const confirm = async (message, defaultValue = true) => {
  const yn = !!defaultValue ? 'Y/n' : 'y/n'
  let response = await question(`${message} ${yn}: `)
  while (
    response.toLowerCase() !== 'y' &&
    response.toLowerCase() !== 'n' &&
    response !== ''
  ) {
    response = await question(`Invalid response. ${message} ${yn}: `)
  }

  return (
    response.toLowerCase() === 'y' ? true :
    response.toLowerCase() === 'n' ? false :
    defaultValue
  )
}

exports.confirm = confirm
exports.question = question
