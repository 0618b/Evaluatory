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
    router.get('/selftemps', function(req, res) {
        SelfTemplate.find({}, function(err, docs) {
            res.json(docs);
            console.log(docs);
        });
    });
    router.get('/selftemps/:id', function (req, res) {
        SelfTemplate.find({_id: req.params.id}, function (err, docs) {
            res.json(docs);
        });
    });
    router.delete('/selftemps/:id', function(req, res) {
        SelfTemplate.remove({_id:req.params.id}, function(err, docs) {
            res.json(docs);
            res.send('Deleted'); 
        });
    });
    router.put('/selftemps/:id', function(req, res) {
        SelfTemplate.findOneAndUpdate({_id:req.params.id}, req.body, function(err, data) {
            res.json(data);
        });
    });

    return router;

};