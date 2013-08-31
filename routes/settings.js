/*
 * GET settings page
 */

exports.settings = function(req, res){
    var authenticated = true;
    if (authenticated) {
        res.render('index', { title: 'Dashboard' });
    }
};
