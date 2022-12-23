const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const db = require('../models');

// create main Model
const User = db.User;

module.exports = function (passport) {
  // Google auth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          user_id: profile.user_id,
          username: profile.username,
          password: profile.name.password,
          age: profile.name.age,
          statusbool: profile.statusbool,
        };

        try {
          let user = await User.findOne({ user_id: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  // JWT strategy
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: (req) => req.cookies.jwt,
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          // Find the user in the database based on the JWT payload
          const user = await User.findByPk(payload.id);
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
