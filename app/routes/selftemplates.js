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
    router.get('/selftemps/:id', function(req, res, next) {
        var id = req.params.id;
        SelfTemplate.find({ _id: id }, function(err, selftemp) {
            if (err) return next(err);
            res.json(selftemp);
        });
    });
    router.delete('/selftemps/:id', function(req, res, next) {
        var id = req.params.id;
        SelfTemplate.findOneAndRemove(id, function(err) {
            if (err) return next(err);
            res.send('Deleted');
        });
    });
    router.put('/selftemps/:id', function(req, res, next) {
        var id = req.params.id;
        var obj = req.body;
        SelfTemplate.findByIdAndUpdate(id, { self_template: obj.self_template }, function(err, selftemp) {
            if (err) return next(err);
            res.send('Updated');
        });
    });

    return router;

};