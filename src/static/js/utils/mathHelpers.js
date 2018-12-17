/**
 * Format ms to hours, minutes and seconds
 * @NOTE: Will always return at least minutes and seconds
 * @param {Number} ms - The time to be formatted in milliseconds
 * @returns {string} - The formatted time like "1:05" or "2:34:59" or "255:05:59"
 */
export const formatMilliseconds = ms => {
  const time = ms / 1000;

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}:${minutes < 10 ? '0' : ''}`;
  }

  formattedTime += `${minutes}:${seconds < 10 ? '0' : ''}`;
  formattedTime += `${seconds}`;

  return formattedTime;
};
