const LibsImporter = require('../../lib/libsImporter');

/**
 * The task utility
 */
class Task {
  /**
   * The libs object
   *
   * @var {Object<string, any>}
   */
  libs = {}

  /**
   * Constructor
   *
   * @param {Array<string>} archosLibraries
   * @param {Array<string>} externalLibraries
   * @return {this}
   */
  constructor(archosLibraries, external) {
    this.make(archosLibraries, external);
  }

  /**
   * Main method
   *
   * @return {void}
   */
  make(archosLibraries, external) {
    this.archosLibs = archosLibraries;
    this.externalLibs = external;

    const archosLibrariesImporter = LibsImporter.make(
      this.archosLibs,
      './'
    );

    const librariesImporter = LibsImporter.make(this.externalLibs);

    this.libs = {
      ...archosLibrariesImporter.librariesObject,
      ...librariesImporter.librariesObject,
    };
  }
}

module.exports = Task
