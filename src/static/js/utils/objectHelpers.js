/**
 * Pick specific key/value pairs from specified object
 * @param {Object} object - The raw object to be filtered
 * @param {Array} keys - The keys to filter by
 * @returns {Object} - An object containing the selected keys
 */
export const pick = (object, keys) => {
  return keys.reduce((obj, key) => ({ ...obj, [key]: object[key] }), {});
};
