var SelfHeader = require('../models/selfheaders');

module.exports = function(router) {

    router.post('/selfheaders', function(req, res) {
        var sh = new SelfHeader();
        sh.self_header = req.body.self_header;
        sh.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                console.log(req.body);
            }
        });
    });
    router.get('/selfheaders', function(req, res) {
        SelfHeader.find({}, function(err, docs) {
            res.json(docs);
        });
    });
    router.get('/selfheaders/:id', function (req, res) {
        SelfHeader.find({_id: req.params.id}, function (err, docs) {
            res.json(docs);
        });
    });
    router.delete('/selfheaders/:id', function(req, res) {
        SelfHeader.remove({_id:req.params.id}, function(err, docs) {
            res.json(docs);
            res.send('Deleted'); 
        });
    });
    router.put('/selfheaders/:id', function(req, res) {
        SelfHeader.findOneAndUpdate({_id:req.params.id}, req.body, function(err, data) {
            res.json(data);
        });
    });

    return router;

};