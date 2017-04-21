var SelfTemplate = require('../models/selftemplates');

module.exports = function(router) {

    router.post('/selftemps', function(req, res) {
        var st = new SelfTemplate();
        st.self_template = req.body.self_template;
        st.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                console.log(req.body);
            }
        });
    });
    router.get('/selftemps', function(req, res, next) {
        SelfTemplate.find({}, function(err, selftemps) {
            if (err) return next(err);
            res.json(selftemps);
        });
    });
    router.get('/selftemps/:id', function (req, res, next) {
        SelfTemplate.findById({_id: req.params.id}, function (err, selftemp) {
            if (err) return next(err);
            res.json(selftemp);
        });
    });
    router.delete('/selftemps/:id', function(req, res, next) {
        var deleteObj = req.params.id;
        SelfTemplate.findOneAndRemove({_id: deleteObj}, req.body, function(err, selftemp) {
            if (err) return next(err);
            res.json(selftemp);
        });
    });
    router.put('/selftemps/:id', function(req, res, next) {
        SelfTemplate.findOneAndUpdate({id: req.params.id}, req.body, function(err, selftemp) {
            if (err) return next(err);
            res.json(selftemp);
        });
    });

    return router;

};