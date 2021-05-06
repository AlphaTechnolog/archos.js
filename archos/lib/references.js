const fs = require('fs');
const log = require('./log');

class References {
  /**
   * Replace all ${variable} to variable in object key
   * 
   * @param {string} content
   * @param {Object<any, any>} object
   * @return {string}
   */
  process(content, object) {
    Object.entries(object).forEach(([ key, val ]) => {
      const regex = new RegExp(`~${key}~`, 'g');

      content = content.replace(
        regex,
        val
      );
    });

    return content
  }

  /**
   * Process the reference
   * 
   * @param {string} path
   * @param {Object<any, any>} argv
   * @return {Promise<string>}
   */
  processReference(path, argv) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, content) => {
        if (err) {
          log.error('Error at read the reference, error: ' + err);
        }

        content = this.process(
          content,
          argv
        );

        resolve(content);
      });
    });
  }

  /**
   * Create a new file with a content
   * 
   * @param {string} filename
   * @param {string} content
   * @return {Promise<void>}
   */
  newFile(filename, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, content, err => {
        err && log.error('Error at write the file');
        resolve();
      });
    });
  }

  /**
   * Append a content in a reference
   * 
   * @param {string} file
   * @param {string} toAppend
   * @return {Promise<void>}
   */
  append(file, toAppend, endline=false) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, content) => {
        if (err) {
          log.error('Error at read the make file: ' + err);
        }

        let eln;

        if (endline === true) {
          eln = '\n';
        } else {
          eln = '';
        }

        const newContent = content + eln + toAppend;

        fs.writeFile(file, newContent, err => {
          if (err) {
            log.error('Error at write the make file: ' + err);
          }

          resolve();
        });
      });
    });
  }
}

module.exports = new References();
