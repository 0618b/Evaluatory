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
        User.findOne({ username: req.body.username }).select('username password firstName lastName position belongTo group groupRole permission selftemplates othertemplates').exec(function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({
                    success: false,
                    msg: 'ไม่มีชื่อผู้ใช้งานนี้ในระบบ โปรดลองใหม่อีกครั้ง'
                });
            } else if (user) {
                if (!req.body.password) {
                    res.json({
                        success: false,
                        msg: 'กรุณาป้อนรหัสผ่าน'
                    })
                } else {
                    var validPassword = user.comparePassword(req.body.password);
                    console.log(validPassword);
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
                            permission: user.permission,
                            selftemplates: user.selftemplates,
                            othertemplates: user.othertemplates
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

    // Selftemplate API

    router.post('/selftemps', function(req, res) {
        var st = new SelfTemplate();
        st.header = req.body.header;
        st.self_template = req.body.self_template;
        st.totalScore = req.body.totalScore;
        st.isCloned = req.body.isCloned;
        st.isSubmitted = req.body.isSubmitted;
        st.evaluatedBy = req.decoded.username;
        st.save(function(err) {
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
                                    msg: 'สร้างแบบประเมินเรียบร้อยแล้ว'
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
    router.get('/selftemps/notcloneyet', function(req, res, next) {
        SelfTemplate.find({ isCloned: false }, function(err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
    router.get('/selftemps/notsubmityet', function(req, res, next) {
        SelfTemplate.find({ isSubmitted: false }, function(err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
    router.get('/selftemp/:id', function(req, res, next) {
        User.findOne({ _id: req.decoded.id }).populate('selftemplates').exec(function(err, data) {
            if (!data) {
                res.json({
                    success: false,
                    msg: 'ไม่พบแบบประเมิน กรุณาสร้างแบบประเมิน'
                })
            } else {
                res.json({
                    success: true,
                    data: data
                })
            }
        })
    });
    router.delete('/selftemp/:id', function(req, res, next) {
        SelfTemplate.findOneAndRemove({ _id: req.params.id }, function(err) {
            if (err) return next(err);
            res.json('Deleted');
        });
    });
    router.put('/selftemp/:id', function(req, res, next) {
        User.findOne({ _id: req.decoded.id }).populate('selftemplates', req.body).exec(function(err) {
            if (err) return next(err);
            res.json('Updated');
        });
    });

    // Othertemplate API

    router.post('/othertemps', function(req, res) {
        var ot = new OtherTemplate();
        ot.other_template = req.body.other_template;
        ot.totalScore = req.body.totalScore;
        ot.isCloned = req.body.isCloned;
        ot.isSubmitted = req.body.isSubmitted;
        ot.evaluatedBy = req.body.evaluatedBy;
        ot.save(function(error) {
            if (!error) {
                OtherTemplate.find({})
                    .populate('evaluatedBy')
                    .exec(function(error, othertemplates) {
                        console.log(JSON.stringify(othertemplates, null, '\t'))
                    })
            } else {
                console.log(req.body);
            }
        });
    });

    router.get('/othertemps', function(req, res) {
        OtherTemplate.find({}, function(err, docs) {
            res.json(docs);
        });
    });

    router.get('/othertemps/:id', function(req, res) {
        OtherTemplate.find({ _id: req.params.id }, function(err, docs) {
            res.json(docs);
        });
    });

    router.delete('/othertemps/:id', function(req, res) {
        OtherTemplate.remove({ _id: req.params.id }, function(err, docs) {
            res.json(docs);
            res.send('Deleted');
        });
    });

    router.put('/othertemps/:id', function(req, res) {
        OtherTemplate.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, data) {
            res.json(data);
        });
    });

    return router;

};