var _ = require('lodash');
var async = require('async');
var apiCaller = require('request-promise');
var logger = require('../utils/log/logger');

var userController = {

    /**
     * GET /login
     * Login page.
     */
    getLogin : function(req, res) {
        res.render('signin', {
            title: 'Sign In',
            errors: req.flash("errors")
        });
    },

    /**
     * POST /login
     * Sign in using email and password.
     */
    postLogin : function(req, res, next) {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password cannot be blank').notEmpty();
        req.sanitize('email').normalizeEmail({ remove_dots: false });

        var errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/signin');
        }

        req.flash('success', { msg: 'Success! You are logged in.' });
        res.redirect('/dashboard');
    },

    getDashboard : function(req, res) {

        res.render('dashboard', {
            title: 'Dashboard',
            errors: req.flash("errors"),
            success: req.flash("success")
        });

    },

    getTxns : function(req, res) {

        res.render('transactions', {
            title: 'Transactions',
            errors: req.flash("errors"),
            success: req.flash("success")
        });

    },

    getRecords: function (req, res) {
        res.render('healthRecords', {
            title: 'Health Records',
            errors: req.flash("errors"),
            success: req.flash("success")
        });
    },

    callPayAPI: function (req, res) {

        logger.info('Call Payment API');
        var jsonResult = "{'test': 'test'}";
        res.send(JSON.stringify(jsonResult));

    }

};

module.exports = userController;
