var User = require('../models/users');
var SelfTemplate = require('../models/selftemplates');
var OtherTemplate = require('../models/othertemplates');
var jwt = require('jsonwebtoken');
var magic = 'ggwp';

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
                    msg: 'มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง'
                });
            } else {
                res.json({
                    success: true,
                    msg: 'สร้างผู้ใช้งานเรียบร้อยแล้ว'
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

    router.get('/user/:id', function(req, res, next) {
        User.findOne({ _id: req.params.id }, function(err, user) {
            if (err) {
                return next(err);
            } else {
                res.json(user);
            }
        });
    });

    router.delete('/user/:id', function(req, res, next) {
        User.findOneAndRemove({ _id: req.params.id }, function(err) {
            if (err) {
                return next(err);
            } else {
                res.json('Deleted!');
            }
        });
    });

    router.put('/user/:id', function(req, res, next) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, user) {
            if (err) {
                return next(err);
            } else {
                res.json(user);
            }
        });
    });

    router.post('/authenticate', function(req, res) {
        var loginUser = req.body.username;
        User.findOne({ username: loginUser }).select('username password firstName lastName position belongTo group groupRole permission selftemplates othertemplates').exec(function(err, user) {
            //if (err) throw err;
            // Check if user is found in the database (based on username)
            if (!user) {
                res.json({
                    success: false,
                    msg: 'ไม่มีชื่อผู้ใช้งานนี้ในระบบ โปรดลองใหม่อีกครั้ง'
                }); // Username not found in database
            } else if (user) {
                // Check if user does exist, then compare password provided by user
                if (!req.body.password) {
                    res.json({
                            success: false,
                            msg: 'กรุณาป้อนรหัสผ่าน'
                        }) // Password was not provided
                } else {
                    var validPassword = user.comparePassword(req.body.password); // Check if password matches password provided by user 
                    if (!validPassword) {
                        res.json({
                            success: false,
                            msg: 'กรุณาป้อนชื่อผู้ใช้งานและรหัสผ่านให้ถูกต้อง'
                        }); // Password does not match password in database
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
                            permission: user.permission,
                            selftemplates: user.selftemplates,
                            othertemplates: user.othertemplates
                        }, magic, {})
                        res.json({
                            success: true,
                            msg: 'เข้าสู่ระบบสำเร็จ',
                            token: token,
                            user: user
                        })
                        console.log(user);
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
        res.json(req.decoded);
    });

    router.get('/permission', function(req, res) {
        User.findOne({ username: req.decoded.username }, function(err, user) {
            if (!user) {
                res.json({
                    success: false,
                    msg: 'ไม่พบผู้ใช้งานดังกล่าว'
                })
            } else {
                res.json({
                    success: true,
                    permission: user.permission
                })
            }
        })
    });

    // Test Area !!!

    var fullName = req.decoded.firstName + " " + req.decoded.lastName;

    // Selftemplate API

    router.post('/selftemps', function(req, res) {
        var st = new SelfTemplate();
        st.self_template = req.body.self_template;
        st.evaluatedBy = fullName;
        st.isEvaluated = req.body.isEvaluated;
        st.save(function(err, selftemp) {
            if (err) {
                res.json({
                    success: false,
                    msg: 'มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง'
                });
            } else {
                User.findOne({ username: req.decoded.username }, function(err, user) {
                    if (!user) {
                        res.json({
                            success: false,
                            msg: 'ไม่พบผู้ใช้งานดังกล่าว'
                        })
                    } else {
                        user.selftemplates.push(st);
                        user.save(function(err) {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้ง'
                                })
                            } else {
                                res.json({
                                    success: true,
                                    msg: 'สร้างแบบประเมินเรียบร้อยแล้ว',
                                    selftemp: selftemp
                                });
                            }
                        })
                    }
                })
            }
        });
    });

    router.get('/selftemps', function(req, res, next) {
        SelfTemplate.find({}, function(err, selftemps) {
            if (err) return next(err);
            res.json(selftemps);
        });
    });
    router.get('/selftempu/:id', function(req, res, next) {
        SelfTemplate.find({ evaluatedBy: req.decoded.username }).populate('user').exec(function(err, data) {
            if (err) return next(err);
            res.json(data);
        })
    })
    router.get('/selftemps/notevalyet', function(req, res, next) {
        SelfTemplate.find({ isEvaluated: false }, function(err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
    router.get('/selftemp/:id', function(req, res, next) {
        SelfTemplate.findOne({ _id: req.params.id }, function(err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
    router.put('/selftemp/:id', function(req, res, next) {
        SelfTemplate.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, data) {
            if (err) {
                return res.send(err);
            } else {
                res.json({
                    data: data,
                    msg: "Success"
                });
            }
        });
    });

    // Othertemplate API

    router.post('/othertemps', function(req, res) {
        var ot = new OtherTemplate();
        ot.other_template = req.body.other_template;
        ot.receipients = req.body.receipients;
        ot.evaluatedBy = fullName;
        ot.isEvaluated = req.body.isEvaluated;
        ot.save(function(err, othertemp) {
            if (err) {
                res.json({
                    success: false,
                    msg: 'มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง'
                });
            } else {
                User.findOne({ username: req.decoded.username }, function(err, user) {
                    if (!user) {
                        res.json({
                            success: false,
                            msg: 'ไม่พบผู้ใช้งานดังกล่าว'
                        })
                    } else {
                        user.othertemplates.push(ot);
                        user.save(function(err) {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้ง'
                                })
                            } else {
                                res.json({
                                    success: true,
                                    msg: 'สร้างแบบประเมินเรียบร้อยแล้ว',
                                    othertemp: othertemp
                                });
                            }
                        })
                    }
                })
            }
        });
    });

    router.get('/othertemps', function(req, res, next) {
        User.find({}, function(err, users) {
            if (err) {
                return next(err);
            } else {
                res.json(users);
            }
        });
    });
    router.get('/othertempu/:id', function(req, res, next) {
        OtherTemplate.find({ evaluatedBy: req.decoded.username }).populate('user').exec(function(err, data) {
            if (err) return next(err);
            res.json(data);
        })
    })
    router.get('/othertemps/notevalyet', function(req, res, next) {
        OtherTemplate.find({ isEvaluated: false }, function(err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
    router.get('/othertemp/:id', function(req, res, next) {
        OtherTemplate.findOne({ _id: req.params.id }, function(err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
    router.put('/othertemp/:id', function(req, res, next) {
        OtherTemplate.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, data) {
            if (err) {
                return res.send(err);
            } else {
                res.json({
                    data: data,
                    msg: "Success"
                });
            }
        });
    });

    return router;

};