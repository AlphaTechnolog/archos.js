const objects = require('../../lib/objects');
const makers = require('../../Cli/Makers/index.js');
const log = require('../../lib/log')

/**
 * The cli class utility
 */
class BootedCli {
  /**
   * The options object
   * 
   * @private
   * @var {Object<string, any>}
   */
  _options = {};

  /**
   * The options argc (argument count)
   * 
   * @private
   * @var {number}
   */
  _optionsArgc = 0;

  /**
   * The options rules arguments
   * 
   * @private
   * @var {Object<string, Object<string, string|boolean>}
   */
  _optionsRules = {
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

  /**
   * Constructor
   * 
   * @param {any} yargs
   * @return {this}
   */
  constructor(yargs) {
    this.make(yargs);
  }

  /**
   * Define the arguments rules
   * 
   * @param {any} yargs
   * @return {Object<string, Object<string, any>|int>}
   */
  _parceArguments__rules(yargs) {
    const rules = yargs;

    Object.entries(this._optionsRules).forEach(([ name, options ]) => {
      rules.option(
        name,
        options
      );
    });

    return {
      argv: rules.argv,
      argc: objects.Object(rules.argv).length,
    };
  }

  /**
   * Parse the command line arguments
   * 
   * @param {any} yargs
   * @return {Object<string, Object<string, any>|int>}
   */
  _parseArguments(yargs) {
    return this._parceArguments__rules(yargs);
  }

  /**
   * Main class method
   * 
   * @param {any} yargs
   * @return {void}
   */
  make(yargs) {
    const { argc, argv } = this._parseArguments(yargs);
    this._options = argv;
    this._optionsArgc = argc;
  }

  /**
   * Start the cli app
   * 
   * @return {void}
   */
  start() {
    if (!makers[this._options.make]) {
      log.error('Invalid maker invoked');
    }

    Object.entries(makers).forEach(async ([ name, Maker ]) => {
      if (name === this._options.make) {
        const maker = new Maker(this._options, this._optionsArgc);
        await maker.run();
      }
    });
  }
}

module.exports = BootedCli