/**
 * Check if a failed Spotify request was rejected because the access token
 * is no longer valid. The Spotify client rejects with the failed request.
 * @param {Object} error - The rejection value of a Spotify request
 * @returns {Boolean}
 */
export const isUnauthorizedError = (error) => {
  return !!error && error.status === 401
}
