var hue = require('node-hue-api');
var crypto = require('crypto');

/*
 * GET /hue/bridges
 *
 * Returns a JSON-formatted list of bridges.
 */
exports.findBridges = function(req, res) {
    hue.locateBridges()
        .then(function(bridges) {
            var json = {
                message: 'Success!',
                bridges: bridges
            };
            res.json(json);
        })
        .catch(function (err) {
            console.error("Error occurred: " + err);
            res.json(500, { message: 'Internal server error' });
        })
        .done();
};

/*
 * POST /hue/bridge/:hostname/connect
 *
 * Connects to a bridge with the specified :hostname.
 */
exports.connectBridge = function(models, req, res) {
    var user = req.user;
    var hue_user = user.hue_user;
    var hostname = req.params.hostname;
    var hue_api = new hue.HueApi();

    hue_api.registerUser(hostname, hue_user)
        .then(function(hue_res) {
            if (hue_res === hue_user) {
                var Bridge = models.Bridge;
                var handleErrors = function(err) {
                    console.error(err);
                    res.json(500, { message: 'Internal server error '});
                };

                Bridge.find({ limit: 1})
                    .then(function(bridge) {
                        if (bridge) {
                            console.info('Removing old bridge.');
                            return bridge.destroy();
                        }
                        return true;
                    }, handleErrors)
                    .then(function() {
                        return Bridge.create({
                            hostname: hostname
                        });
                    }, handleErrors)
                    .then(function(bridge) {
                        res.json({
                            message: 'Success!',
                            bridge: hostname,
                            user: user.hue_user
                        });
                    }, handleErrors);
            } else {
                res.json(200, {
                    code: 2,
                    message: 'Request rejected by bridge.'
                });
            }
        })
        .fail(function(err) {
            if (err.name === 'Api Error') {
                res.json(200, {
                    code: 1,
                    message: 'Press link button on bridge and try again.'
                });
            } else {
                console.error(err);
                res.json(500, { message: 'Internal server error' });
            }
        })
        .done();
};