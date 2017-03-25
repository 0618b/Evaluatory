var User = require('../models/users');

module.exports = function(router) {

    // get all data
    router.get('/users', function(req, res) {
        User.find({}, function(err, docs) {
           res.json(docs);
        });
    });

    // get user profile only one
    router.get('/users/:id', function(req, res) {
        User.find({_id:req.params.id}, function(err, docs) {
            res.json(docs);
        });
    });

    router.post('/users', function(req, res) {
        var u = new User();
        u.username = req.body.username;
        u.password = req.body.password;
        u.firstName = req.body.firstName;
        u.lastName = req.body.lastName;
        u.position = req.body.position;
        u.positionLevel = req.body.positionLevel;
        u.positionCategory = req.body.positionCategory;
        u.positionNumber = req.body.positionNumber;
        u.belongTo = req.body.belongTo;
        u.subjectGroup = req.body.subjectGroup;
        u.workGroup = req.body.workGroup;
        u.classGroup = req.body.classGroup;


            if(req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' ||
               req.body.firstName === null || req.body.firstName === '' || req.body.lastName === null || req.body.lastName === '' ||
               req.body.position === null || req.body.position === '' || req.body.positionLevel === null || req.body.positionLevel === '' ||
               req.body.positionCategory === null || req.body.positionCategory === '' || req.body.positionNumber === null || req.body.positionNumber === '' ||
               req.body.belongTo === null || req.body.belongTo === '' || req.body.subjectGroup === null || req.body.subjectGroup === '' ||
               req.body.workGroup === null || req.body.workGroup === '' || req.body.classGroup === null || req.body.classGroup === '') {
                   res.send('กรุณากรอกข้อมูลให้ครบทุกช่อง');
               } else {
                   u.save(function(err) {
                       if (err) {
                           res.send('มีบางอย่างผิดพลาด');
                       } else {
                           res.send('หัวข้อการประเมินถูกบันทึกเรียบร้อยแล้ว');
                           console.log(req.body);
                       }
                   });
               }
        });

    router.delete('/users/:id', function (req, res) {
        User.remove({_id:req.params.id}, function(err, docs) {
            res.json(docs);
        });
    });

    router.put('/users/:id', function (req, res) {
        User.findOneAndUpdate({_id:req.params.id}, req.body, function(err, data) {
            if (err) {
                res.send('มีบางอย่างผิดพลาด');
            } else {
                res.send('แก้ไขผู้ใช้งานเรียบร้อยแล้ว');
                console.log(data);
            }
        });
    });

    router.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    return router;

}