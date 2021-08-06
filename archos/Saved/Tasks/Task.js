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

    const archosLibrariesImporter = new LibsImporter(this.archosLibs.map(
      lib => ({
        ...lib,
        import: './' + lib.import
      })
    ));

    const librariesImporter = new LibsImporter(this.externalLibs);

    for (const [libraryName, library] of Object.entries(archosLibrariesImporter.librariesObject)) {
      this.libs[libraryName] = library;
    }

    for (const [libraryName, library] of Object.entries(librariesImporter.librariesObject)) {
      this.libs[libraryName] = library;
    }
  }
}

module.exports = Task