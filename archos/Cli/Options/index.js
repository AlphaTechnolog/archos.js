module.exports = {
  make: {
    alias: 'mk',
    describe: 'What do you make?',
    type: 'string',
    demandOption: true
  },

  name: {
    describe: 'The name of make',
    type: 'string',
    demandOption: true,
  },

  type: {
    describe: 'The type of make',
    type: 'string',
    demandOption: false,
  },

  method: {
    describe: 'The method of make',
    type: 'string',
    demandOption: false
  }
}
