var User = require('../models/users');

module.exports = function(router) {

    // Create new user
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
        u.subjectGroupRole = req.body.subjectGroupRole;
        u.workGroupRole = req.body.workGroupRole;
        u.classGroupRole = req.body.classGroupRole;
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

    router.post('/authenticate', function(req, res) {
        var loginUser = (req.body.username).toLowerCase();
        User.findOne({ username: loginUser }).select('username password').exec(function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({
                    success: false,
                    msg: 'กรุณาป้อนชื่อผู้ใช้งานและรหัสผ่านให้ถูกต้อง'
                });
            } else if (user) {
                if (!req.body.password) {
                    res.json({
                        success: false,
                        msg: 'กรุณาป้อนชื่อผู้ใช้งานและรหัสผ่านให้ถูกต้อง'
                    })
                } else {
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({
                            success: false,
                            msg: 'กรุณาป้อนชื่อผู้ใช้งานและรหัสผ่านให้ถูกต้อง'
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: 'เข้าสู่ระบบสำเร็จ'
                        })
                    }
                }

            }
        })
    })

    return router;

};