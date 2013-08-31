
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./router');

var Sequelize = require('sequelize');

// Since this is a personal web server not meant to scale, we use SQLite
var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'persist/db.sqlite'
});
var User = sequelize.import(__dirname + '/models/user');


var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'change me later'}));
app.use(flash());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// Set up Passport for authentication
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

// Set up routes
routes.route(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
