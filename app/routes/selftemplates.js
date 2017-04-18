var SelfTemplate = require('../models/selftemplates');

module.exports = function(router) {

    router.post('/selftemps', function(req, res, next) {
        SelfTemplate.create(req.body, function(err, selftemp) {
            if (err) return next(err);
            res.json(selftemp);
        });
    });
    router.get('/selftemps', function(req, res, next) {
        SelfTemplate.find(function(err, selftemps) {
            if (err) return next(err);
            res.json(selftemps);
        });
    });
    router.get('/selftemps/:id', function (req, res, next) {
        SelfTemplate.findById(req.params.id, function (err, selftemp) {
            if (err) return next(err);
            res.json(selftemp);
        });
    });
    router.delete('/selftemps/:id', function(req, res, next) {
        SelfTemplate.findByIdAndRemove(req.params.id, req.body, function(err, selftemp) {
            if (err) return next(err);
            res.json(selftemp);
        });
    });
    router.put('/selftemps/:id', function(req, res, next) {
        SelfTemplate.findByIdAndUpdate(req.params.id, req.body, function(err, selftemp) {
            if (err) return next(err);
            res.json(selftemp);
        });
    });

    return router;

};