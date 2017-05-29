var passport = require('passport');
var User = require('./models/user');
var config = require('./config');
var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy = require('passport-github').Strategy;

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.github = passport.use(new GithubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOne({OauthId: profile.id}, function (err, user) {
            if (err) {
                console.log(err); // handle errors!
            }
            if (!err && user !== null) {
                done(null, user);
            } else {
                user = new User({
                    username: profile.displayName
                });
                user.OauthId = profile.id;
                user.OauthToken = accessToken;
                user.save(function (err) {
                    if (err) {
                        console.log(err); // handle errors!
                    } else {
                        console.log("saving user ...");
                        done(null, user);
                    }
                });
            }
        });
    }
));