var passport = require('passport');

var routes = {
    index: require('./routes/index').index,
    settings: require('./routes/settings'),
    auth: require('./routes/auth'),
    hue: require('./routes/hue')
};

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // WARN: Potential security vulnerability if req.originalUrl isn't escaped properly
    var login_url = '/login?redirect=' + req.originalUrl;
    res.redirect(login_url);
};

exports.route = function(app, sequelize) {
    var m = function(route) {
        var models = {
            User: sequelize.import(__dirname + '/models/user'),
            Bridge: sequelize.import(__dirname + '/models/bridge')
        };

        return route.bind(null, models);
    };

    app.get('/', routes.index);
    app.get('/settings', ensureAuthenticated, m(routes.settings.index));
    app.get('/settings/bridges', ensureAuthenticated, routes.settings.configBridges);


    /* Authentication */
    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), function(req, res) {
        var redirect_url = req.query.redirect || '/';
        res.redirect(redirect_url);
    });
    app.get('/login', routes.auth.login_page);
    app.get('/logout', routes.auth.logout);


    /* Hue API */
    app.get('/hue/bridges', ensureAuthenticated, routes.hue.findBridges);
    app.post('/hue/bridge/:hostname/connect', ensureAuthenticated,
        m(routes.hue.connectBridge));
};