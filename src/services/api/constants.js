export const CLIENT_ID = '7c4b139308784771a7b9acc2c8f6df95';
export const ALLOWED_ORIGIN_URI = 'http://localhost:3000';
export const REDIRECT_URI = `${window.location.protocol}//${
  window.location.host
}/authorize`;

export const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-read-recently-played',
  'user-read-currently-playing',
  'playlist-read-private'
];
