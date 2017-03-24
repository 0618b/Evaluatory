var EvalForm = require('../models/evalforms');

module.exports = function(router) {
    
    // get all data
    router.get('/evalforms', function(req, res) {
        EvalForm.find({}, function (err, docs) {
            res.json(docs);
        });
    });

    // create evalforms 
    router.post('/evalforms', function(req, res) {
        var ef = new EvalForm();
        ef.evalFormType = req.body.evalFormType;
        ef.evalTopic = req.body.evalTopic;
        ef.evalWeight = req.body.evalWeight;
        ef.evalCriteria = req.body.evalCriteria;

            // Check if request is valid and not empty or null
            if (req.body.evalFormType === null || req.body.evalFormType === '' || req.body.evalTopic === null || req.body.evalTopic === '' || req.body.evalWeight === null || req.body.evalWeight === '' || req.body.evalCriteria === null || req.body.evalCriteria === '') {
                res.send('กรุณากรอกข้อมูลให้ครบทุกช่อง');
            } else {
                ef.save(function(err) {
                    if (err) {
                        res.send('มีบางอย่างผิดพลาด');
                    } else {
                        res.send('หัวข้อการประเมินถูกบันทึกเรียบร้อยแล้ว');
                        console.log(req.body);
                    }
              });
          }
    });

    // get data's id
    router.get('/evalforms/:id', function (req, res) {
        EvalForm.find({_id: req.params.id}, function (err, docs) {
            res.json(docs);
        });
    });

    router.delete('/evalforms/:id', function(req, res) {
        EvalForm.remove({_id:req.params.id}, function(err, docs) {
            res.json(docs);
        });
    });

    // Update 
    router.put('/evalforms/:id', function(req, res) {
        EvalForm.findOneAndUpdate({_id:req.params.id}, req.body, function(err, data) {
            if (err) {
                res.send('มีบางอย่างผิดพลาด');
            } else {
                res.send('หัวข้อการประเมินได้รับการแก้ไขเรียบร้อยแล้ว');
                console.log(data);
            }
        });
    });

    // catch 404 and forward to error handler
    router.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    return router;

};