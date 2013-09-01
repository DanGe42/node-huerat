/*
 * GET /settings
 *
 * The settings page
 */
exports.index = function(models, req, res){
    var Bridge = models.Bridge;
    Bridge.find({ limit: 1 })
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
        })
        .failure(function(err) {
            console.error(err);
            res.send(500);
        });
};

/*
 * GET /settings/bridges
 *
 * The bridge configuration page. Searches for bridges.
 */
exports.configBridges = function(req, res) {
    res.render('scan_bridges', { title: 'Scan for bridges '});
};
