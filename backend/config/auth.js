module.exports = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  sessionSecret: process.env.SESSION_SECRET || 'GD5j6JCiq02s8o0c7Zcs'
};