/**
 * Controllers (route handlers).
 */
var homeController = require('./home');
var userController = require('./user');

module.exports = function(app, logger) {
    "use strict";

    /**
     * Primary app routes.
     */
    app.get('/', homeController.index);
    app.get('/signin', userController.getLogin);
    app.post('/signin', userController.postLogin);
    app.get('/dashboard', userController.getDashboard);
    app.get('/transactions', userController.getTxns);
    app.get('/records', userController.getRecords);
    app.get('/pay', userController.callPayAPI);
    app.get('/load', userController.loadDemoData);

    // Set 404 response for non-exist api routes
    app.use(function(req, res, next) {
        var err = new Error('Routes Request URL Not Found');
        err.status = 404;
        logger.warn('[SERVER] 404 NOT FOUND: Received request ('+ req.pathname +') can not be found');
        next(err);
    });
};