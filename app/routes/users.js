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
        u.belongTo = req.body.belongTo;
        u.group = req.body.group;
        u.groupRole = req.body.groupRole;
        u.permission = req.body.permission;
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
        User.findOne({ username: loginUser }).select('username password firstName lastName position belongTo group groupRole').exec(function(err, user) {
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
                            belongTo: user.belongTo,
                            group: user.group,
                            groupRole: user.groupRole,
                            permission: user.permission
                        }, magic, { expiresIn: '15m' })
                        res.json({
                            success: true,
                            msg: 'เข้าสู่ระบบสำเร็จ',
                            token: token,
                            user: user
                        })
                    }
                }
            }
        })
    })

    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, magic, function(err, decoded) {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Token invalid'
                    })
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({
                success: false,
                msg: 'No token provided'
            });
        };
    });

    router.post('/me', function(req, res) {
        res.send(req.decoded);
    });

    return router;

};