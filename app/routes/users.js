var User = require('../models/users');
var jwt = require('jsonwebtoken');
var magic = 'avadakedavra';

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
        var loginUser = (req.body.username);
        User.findOne({ username: loginUser }).select('username password firstName lastName position positionLevel positionCategory positionNumber belongTo subjectGroup workGroup classGroup subjectGroupRole workGroupRole classGroupRole').exec(function(err, user) {
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
                        var token = jwt.sign({
                            username: user.username,
                            password: user.password,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            position: user.position,
                            positionLevel: user.positionLevel,
                            positionCategory: user.positionCategory,
                            positionNumber: user.positionNumber,
                            belongTo: user.belongTo,
                            subjectGroup: user.subjectGroup,
                            workGroup: user.workGroup,
                            classGroup: user.classGroup,
                            subjectGroupRole: user.subjectGroupRole,
                            workGroupRole: user.workGroupRole,
                            classGroupRole: user.classGroupRole
                        }, magic, { expiresIn: '15m' })
                        res.json({
                            success: true,
                            msg: 'เข้าสู่ระบบสำเร็จ',
                            token: token
                        })
                    }
                }

            }
        })
    })

    return router;

};