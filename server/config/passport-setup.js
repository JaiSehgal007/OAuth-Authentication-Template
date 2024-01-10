const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const expressSession = require('express-session');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ["profile", "email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log('Google Strategy Callback');
    try {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
      };

      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        console.log('Existing user found');
        done(null, user);
      } else {
        user = await User.create(newUser);
        console.log('New user created');
        done(null, user);
      }
    } catch (err) {
      console.error('Error in Google Strategy Callback:', err);
      done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  console.log('Serialize User:', user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserialize User ID:', id);
    try {
      const user = await User.findById(id);
      console.log('Deserialized User:', user);
      done(null, user);
    } catch (err) {
      console.error('Error in deserializeUser:', err);
      done(err);
    }
  });
  

module.exports = passport;
