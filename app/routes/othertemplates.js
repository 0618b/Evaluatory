var OtherTemplate = require('../models/othertemplates');

module.exports = function(router) {

    router.post('/othertemps', function(req, res) {
        var ot = new OtherTemplate();
        ot.other_template = req.body.other_template;
        ot.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                console.log(req.body);
            }
        });
    });
    router.get('/othertemps', function(req, res) {
        OtherTemplate.find({}, function(err, docs) {
            res.json(docs);
        });
    });
    router.get('/othertemps/:id', function (req, res) {
        OtherTemplate.find({_id:req.params.id}, function (err, docs) {
            res.json(docs);
        });
    });
    router.delete('/othertemps/:id', function(req, res) {
        OtherTemplate.remove({_id:req.params.id}, function(err, docs) {
            res.json(docs);
            res.send('Deleted'); 
        });
    });
    router.put('/othertemps/:id', function(req, res) {
        OtherTemplate.findOneAndUpdate({_id:req.params.id}, req.body, function(err, data) {
            res.json(data);
        });
    });

    return router;

};