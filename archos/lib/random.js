/**
 * The random class utility.
 */
class Random {
  /**
   * Returns a random number
   *
   * @param {number} limit
   * @return {number}
   */
  number(limit) {
    return Math.floor(Math.random() * (limit + 1));
  }
}

module.exports = new Random()
