var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

module.exports = function(root, sequelize) {
    var User = sequelize.import(root + '/models/user');

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.find({where: {username: username}})
                .success(function(user) {
                    bcrypt.compare(password, user.password_hash, function(err, res) {
                        if (!res) {
                            return done(null, false, { message: 'Invalid username and/or password.' });
                        }
                        return done(null, user);
                    });
                })
                .failure(function(err) {
                    return done(null, false, { message: 'Invalid username and/or password.' });
                });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.find(id)
            .success(function(user) {
                done(null, user);
            })
            .failure(function(err) {
                done(err, false);
            });
    });
};