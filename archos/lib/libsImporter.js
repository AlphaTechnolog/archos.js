class LibsImporter {
  /**
   * Construct the helper.
   *
   * @param {Array<string>} libraries
   */
  constructor(libraries, librariesPrefix) {
    this.libraries = libraries;
    this.librariesPrefix = librariesPrefix;
  }

  /**
   * Make the helper.
   *
   * @static
   * @param {Array<string>} libraries
   */
  static make(libraries, librariesPrefix = "") {
    return new this(libraries, librariesPrefix);
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
        librariesObject[library] = require(this.librariesPrefix + library);
      } else {
        librariesObject[library.as] = require(this.librariesPrefix + library.import);
      }
    }

    return librariesObject;
  }
}

module.exports = LibsImporter
