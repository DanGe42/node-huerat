/*
 * GET /settings
 *
 * The settings page
 */
exports.index = function(models, req, res){
    var Bridge = models.Bridge;
    Bridge.find({ where: { user_id: req.user.id } })
        .success(function(bridge) {
            if (bridge) {
                res.render('settings', {
                    title: 'Settings',
                    hostname: bridge.hostname,
                    username: req.user.hue_user
                });
            } else {
                res.render('settings', { title: 'Settings' });
            }
        });
};

};
