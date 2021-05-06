/**
 * The string functions helpers.
 */
class DataTypes__String {
  /**
   * Parse value as string, if `typeof` if different than string.
   *
   * @param  {string|any} value
   * @return {string}
   */
  fromOther(value) {
    const { stringify: parse } = JSON;
    return typeof(value) !== "string" ? parse(value) : value;
  }
}

module.exports = new DataTypes__String();
