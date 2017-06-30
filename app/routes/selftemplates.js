var SelfTemplate = require('../models/selftemplates');

module.exports = function(router) {

    router.post('/selftemps', function(req, res) {
        var st = new SelfTemplate();
        st.self_template = req.body.self_template;
        st.totalScore = req.body.totalScore;
        st.isCloned = req.body.isCloned;
        st.isSubmitted = req.body.isSubmitted;
        st.evaluatedBy = req.body.evaluatedBy;
        st.save(function(error) {
            if (!error) {
                SelfTemplate.find({})
                    .populate('evaluatedBy')
                    .exec(function(error, selftemplates) {
                        console.log(JSON.stringify(selftemplates, null, '\t'))
                    })
            } else {
                res.json({
                    success: true,
                    msg: 'สร้างแบบประเมินเรียบร้อยแล้ว'
                });
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
        SelfTemplate.findOne({ _id: req.params.id }).populate('evaluatedBy').exec(function(err, selftemp) {
            if (err) return next(err);
            res.json(selftemp);
            console.log('Evaluated by, ' + selftemp.evaluatedBy.username);
        })
    });
    router.delete('/selftemps/:id', function(req, res, next) {
        SelfTemplate.findOneAndRemove({ _id: req.params.id }, function(err) {
            if (err) return next(err);
            res.json('Deleted');
        });
    });
    router.put('/selftemps/:id', function(req, res, next) {
        SelfTemplate.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, selftemp) {
            if (err) return next(err);
            res.send(selftemp);
        });
    });

    return router;

};