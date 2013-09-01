/*

NOTICE
======
This file is meant to be run as a standalone script and not as part of the application!

Make sure you run this once before launching the main server application.
*/

var crypto = require('crypto');

var bcrypt = require('bcrypt');
var express = require('express');
var prompt = require('prompt');
var Sequelize = require('sequelize');

var app = express();
var sequelize = new Sequelize('database' + app.get('env'), 'username', 'password', {
    dialect: 'sqlite',
    storage: 'persist/' + app.get('env') + '.sqlite'
});
var User = sequelize.import(__dirname + '/models/user');

// Create the User table if it doesn't exist
User.sync()
    .error(function(err) {
        console.error('Could not create/find User table. Invalid DB connection?');
        console.error(err);
    })
    .success(promptToCreateUser);

function promptToCreateUser() {
    var pwInput = {
        password: {
            hidden: true,
            required: true
        }
    };

    prompt.start();

    prompt.get([{
        name: 'username',
        required: true
    }], function (err, result) {
        var username = result.username;

        User.find({ where: {username: username} })
            .done(function(err, user) {
                if (user) {
                    console.warn("A user of that name already exists. If you continue, " +
                                 "the user will be updated with a new password.");
                    console.warn("If this is not what you expected, ^C now.");
                }

                prompt.get([{
                    name: 'password',
                    required: true,
                    hidden: true
                }], function (err, result) {
                    if (err) {
                        throw err;
                    }
                    createUser(username, result.password);
                });
            });
    });
}

function createUser(username, password) {
    console.log("Hashing password with bcrypt...");
    var hash = bcrypt.hashSync(password, 11);
    User.create({
        username: username,
        password_hash: hash
    }).success(function(user) {
        console.log("Success!");
    }).failure(function(err) {
        console.error(err);
    });
}
