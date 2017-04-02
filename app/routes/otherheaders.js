var OtherHeader = require('../models/otherheaders');

module.exports = function(router) {

    router.post('/otherheaders', function(req, res) {
        var oh = new OtherHeader();
        oh.other_header = req.body.other_header;
        oh.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                console.log(req.body);
            }
        });
    });
    router.get('/otherheaders', function(req, res) {
        OtherHeader.find({}, function(err, docs) {
            res.json(docs);
        });
    });
    router.get('/otherheaders/:id', function (req, res) {
        OtherHeader.find({_id: req.params.id}, function (err, docs) {
            res.json(docs);
        });
    });
    router.delete('/otherheaders/:id', function(req, res) {
        OtherHeader.remove({_id:req.params.id}, function(err, docs) {
            res.json(docs);
            res.send('Deleted'); 
        });
    });
    router.put('/otherheaders/:id', function(req, res) {
        OtherHeader.findOneAndUpdate({_id:req.params.id}, req.body, function(err, data) {
            res.json(data);
        });
    });

    return router;

};