const fs = require('fs');
const log = require('../log');

/**
 * The views renderer class interface.
 */
class ViewsRenderer {
  /**
   * Construct this class.
   * @param {string} filename
   * @param {Object<string, any>} context
   * @returns {ViewsRenderer}
   */
  constructor(filename, context) {
    this.filename = filename;
    this.context = context;
  }

  /**
   * Returns the file content.
   * @returns {string}
   */
  get content() {
    if (!fs.existsSync(this.filename)) {
      log.error('Invalid filename provided, no such file or directory');
    }

    return fs.readFileSync(this.filename).toString();
  }

  /**
   * Returns the rendered filename content
   * @returns {string}
   */
  get renderedContent() {
    let { content } = this;

    for (const [key, val] of Object.entries(this.context)) {
      content = content.replace(new RegExp(`~${key}~`, 'g'), val);
    }

    return content;
  }

  /**
   * Create a new instance of this.
   * @static
   * @param {string} filename
   * @param {Object<string, any>} context
   * @returns {ViewsRenderer}
   */
  static make(filename, context) {
    return new this(filename, context);
  }
}

module.exports = ViewsRenderer;