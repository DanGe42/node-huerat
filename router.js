var passport = require('passport');

var routes = {
    index: require('./routes/index').index,
    settings: require('./routes/settings').settings,
    auth: require('./routes/auth')
};

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

exports.route = function(app, sequelize) {
    app.get('/', routes.index);
    app.get('/settings', ensureAuthenticated, routes.settings);

    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), function(req, res) {
        res.redirect('/');
    });
    app.get('/login', routes.auth.login_page);
    app.get('/logout', routes.auth.logout);
};