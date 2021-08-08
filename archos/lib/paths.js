const path = require('path');
const fs = require('fs');

/**
 * The paths utility helpers
 */
class Paths {
  /**
   * Concat string with the src path
   * 
   * @param {Array<string>} ...paths
   * @return {string}
   */
  src(...paths) {
    return path.join(this.srcPath, ...paths);
  }

  /**
   * Check if exists a file using async await
   * 
   * @param {string} path
   * @return {Promise<boolean>}
   */
  exists(path) {
    return new Promise((resolve, reject) => {
      fs.access(path, fs.F_OK, err => {
        if (err) {
          resolve(false);
          return;
        }
        
        resolve(true);
      });
    });
  }

  /**
   * Get the src path
   * 
   * @return {string}
   */
  get srcPath() {
    return path.join(__dirname, '..', '..', 'src');
  }
  
  /**
   * Get the developer controllers folder path
   *
   * @return {string}
   */
  get controllersPath() {
    return this.src(
      'controllers'
    );
  }

  /**
   * Get the project path
   * 
   * @return {string}
   */
  get projectPath() {
    return path.join(this.srcPath, '..');
  }

  /**
   * Get the tasks path
   * 
   * @return {string}
   */
  get tasksPath() {
    return this.src('tasks');
  }

  /**
   * Get the archos path
   * 
   * @return {string}
   */
  get archosPath() {
    return path.join(this.projectPath, 'archos');
  }

  /**
   * Get the cli archos path
   * 
   * @return {string}
   */
  get cliPath() {
    return path.join(this.archosPath, 'Cli');
  }

  /**
   * Get the tasks register path
   * 
   * @return {string}
   */
  get registerTasksFile() {
    return path.join(
      this.tasksPath,
      'register',
      'index.js'
    );
  }

  /**
   * Get the views path.
   * 
   * @return {string}
   */
  get viewsDirectory() {
    return path.join(this.srcPath, 'views');
  }
}

module.exports = new Paths()
