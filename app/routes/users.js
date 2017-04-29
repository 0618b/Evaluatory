var User = require('../models/users');

module.exports = function(router) {

    router.post('/users', function(req, res) {
        var u = new User();
        u.username = req.body.username;
        u.password = req.body.password;
        u.firstName = req.body.firstName;
        u.lastName = req.body.lastName;
        u.position = req.body.position;
        u.positionLevel = req.body.positionLevel;
        u.positionCategory = req.body.positionCategory;
        u.belongTo = req.body.belongTo;
        u.subjectGroup = req.body.subjectGroup;
        u.workGroup = req.body.workGroup;
        u.classGroup = req.body.classGroup;
        u.permission = req.body.permission;
        u.subjectGroupRole = req.body.subjectGroupRole;
        u.workGroupRole = req.body.workGroupRole;
        u.classGroupRole = req.body.classGroupRole;

        if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' ||
            req.body.firstName === null || req.body.firstName === '' || req.body.lastName === null || req.body.lastName === '' ||
            req.body.position === null || req.body.position === '' || req.body.positionLevel === null || req.body.positionLevel === '' ||
            req.body.positionCategory === null || req.body.positionCategory === '' || req.body.positionNumber === null || req.body.positionNumber === '' ||
            req.body.belongTo === null || req.body.belongTo === '' || req.body.subjectGroup === null || req.body.subjectGroup === '' ||
            req.body.workGroup === null || req.body.workGroup === '' || req.body.classGroup === null || req.body.classGroup === '') {
            res.json({
                success: false,
                msg: 'กรุณากรอกข้อมูลให้ครบทุกช่อง'
            });
        } else {
            u.save(function(err) {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'มีบางอย่างผิดพลาด'
                    });
                } else {
                    res.json({
                        success: true,
                        msg: 'สำเร็จ'
                    });
                }
            });
        }
    });

    router.get('/users', function(req, res, next) {
        User.find({}, function(err, users) {
            if (err) {
                return next(err);
            } else {
                res.json(users);
            }
        });
    });

    router.get('/users/:id', function(req, res, next) {
        User.findOne({ _id: req.params.id }, function(err, user) {
            if (err) {
                return next(err);
            } else {
                res.json(user);
            }
        });
    });

    router.delete('/users/:id', function(req, res, next) {
        User.findOneAndRemove({ _id: req.params.id }, function(err) {
            if (err) {
                return next(err);
            } else {
                res.json('Deleted!');
            }
        });
    });

    router.put('/users/:id', function(req, res, next) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, user) {
            if (err) {
                return next(err);
            } else {
                res.json(user);
            }
        });
    });

    return router;

};