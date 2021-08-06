const Maker = require("../Maker");
const path = require("path");
const paths = require("../../../lib/paths.js");
const log = require("../../../lib/log.js");
const references = require("../../../lib/references.js");

class Controller extends Maker {
  /**
   * The reference file path.
   *
   * @var {string}
   */
  $reference = path.join(
    __dirname,
    "..",
    "references",
    "controller.reference"
  )

  /**
   * Validate the argv.
   *
   * @return {void}
   */
  validate() {
    if (!this._argv.method) {
      log.warning('Using the method main by default');
    }
  }

  /**
   * Run the maker
   *
   * @return {Promise<void>}
   */
  async run() {
    const controllerPath = path.join(
      paths.controllersPath,
      this._argv.name + ".js"
    );

    if (await paths.exists(controllerPath)) {
      log.error(`The controller ${this._argv.name} already exists`);
    }

    const controllerReference = await references.processReference(
      this.$reference,
      { name: this._argv.name, method: this._argv.method || 'main' }
    );

    log.process("Creating controller...");

    await references.newFile(
      controllerPath,
      controllerReference
    );

    log.success("Created controller successfully!");
  }
}

module.exports = Controller;
