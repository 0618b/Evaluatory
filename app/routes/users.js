var User = require('../models/users');

module.exports = function(router) {

    router.post('/users', function(req, res) {
        var u = new User({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            position: req.body.position,
            positionLevel: req.body.positionLevel,
            positionCategory: req.body.positionCategory,
            belongTo: req.body.belongTo,
            subjectGroup: req.body.subjectGroup,
            workGroup: req.body.workGroup,
            classGroup: req.body.classGroup,
            permission: req.body.permission,
            subjectGroupRole: req.body.subjectGroupRole,
            workGroupRole: req.body.workGroupRole,
            classGroupRole: req.body.classGroupRole
        })
        u.save(function(err) {
            if (err) {
                res.json({
                    success: false,
                    msg: 'มีบางอย่างผิดพลาด'
                })
                console.log(err);
            } else {
                res.json({
                    success: true,
                    msg: 'สำเร็จ'
                });
            }
        });
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