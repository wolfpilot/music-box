/**
 * Search for params in specified URL
 * @param {String} url - The URL to be parsed
 * @returns {Object} - An object containing key/value pairs of all the supplied URL params
 */
export const parseUrlParams = url => {
  return url
    .split('&')
    .map(pair => pair.split('='))
    .reduce((param, [key, value]) => {
      param[key] = value;

      return param;
    }, {});
};

/**
 * Get URL param value based on specified key
 * @param {String} url - The URL to be parsed
 * @param {String} key - The key to look for
 * @returns {String} - Resulting key value
 */
export const getUrlParamByKey = (url, key) => {
  const params = parseUrlParams(url);

  return params[key];
};
