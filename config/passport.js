var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.uuid);
  });

  passport.deserializeUser(function(uuid, done) {
    db.User.findById(uuid).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  //Register for an user
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        process.nextTick(function() {
          db.User.findOne({
            where: {
              email: email
            }
          }).then(function(user, err) {
            if (err) {
              console.log("err", err);
              return done(err);
            }
            if (user) {
              console.log("email " + email + " is already taken.");
              return done(null, false, {
                message: "Sorry, that email is taken."
              });
            } else {
              db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: db.User.generateHash(password)
              })
                .then(function(dbUser) {
                  return done(null, dbUser);
                })
                .catch(function(err) {
                  console.log(err);
                  return done(err);
                });
            }
          });
        });
      }
    )
  );

  //log in to your account
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        db.User.findOne({
          where: {
            email: email
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "It looks like that email doesn't exist!"
              });
            } else if (!user.validPassword(password)) {
              return done(null, false, { message: "Oops! Wrong password." });
            }
            return done(null, user);
          })
          .catch(function(err) {
            return done(err);
          });
      }
    )
  );
};
