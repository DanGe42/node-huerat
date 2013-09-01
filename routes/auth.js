exports.login_page = function(req, res) {
    var redirect_url = req.query.redirect || '/';
    if (req.isAuthenticated()) {
        res.redirect(redirect_url);
        return;
    }

    res.render('login', {
        title: "Login",
        action_url: '/login?redirect=' + redirect_url,
        messages: req.flash('error')
    });
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};