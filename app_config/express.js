var path = require('path');

var express = require('express');
var flash = require('connect-flash');
var passport = require('passport');

module.exports = function(root, app) {
    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', root + '/views');
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
    app.use(express.static(path.join(root, 'public')));

    // development only
    if ('development' === app.get('env')) {
        app.use(express.errorHandler());
    }
};