class LibsImporter {
  /**
   * Construct the helper.
   * 
   * @param {Array<string>} libraries
   */
  constructor(libraries) {
    this.make(libraries);
  }

  /**
   * Make the helper.
   * 
   * @param {Array<string>} libraries
   */
  make(libraries) {
    this.libraries = libraries;
  }

  /**
   * Get the imported libraries object.
   * 
   * @get
   * @returns {Object<string, any>}
   */
  get librariesObject() {
    let librariesObject = {};
    for (const library of this.libraries) {
      if (typeof(library) === 'string') {
        librariesObject[library] = require(library);
      } else {
        librariesObject[library.as] = require(library.import);
      }
    }

    return librariesObject;
  }
}

module.exports = LibsImporter