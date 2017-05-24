export const facebook = {
  clientID: 'INSERT-CLIENT-ID-HERE',
  clientSecret: 'INSERT-CLIENT-SECRET-HERE',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
};

export const google = {
  clientID: '628950491761-ch0a53h0h7r5u1a54loiq3632s8oj868.apps.googleusercontent.com',
  clientSecret: 'a4D56CQsJHK_gsTB8cV6xdTq',
  callbackURL: 'http://localhost:3000/auth/google/callback',
};