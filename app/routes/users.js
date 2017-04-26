var User = require('../models/users');

module.exports = function(router) {

    // get all data
    router.get('/users', function(req, res) {
        User.find({}, function(err, data) {
            if (err) {
                res.send('Error');
            } else {
                res.json(data);
            }
        });
    });

    // get user profile only one
    router.get('/users/:id', function(req, res) {
        var id = req.params.id;
        User.find({ _id: id }, function(err, data) {
            if (err) {
                res.send('Error');
            } else {
                res.json(data[0]);
            }
        });
    });

    // create new user
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

        if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' ||
            req.body.firstName === null || req.body.firstName === '' || req.body.lastName === null || req.body.lastName === '' ||
            req.body.position === null || req.body.position === '' || req.body.positionLevel === null || req.body.positionLevel === '' ||
            req.body.positionCategory === null || req.body.positionCategory === '' || req.body.positionNumber === null || req.body.positionNumber === '' ||
            req.body.belongTo === null || req.body.belongTo === '' || req.body.subjectGroup === null || req.body.subjectGroup === '' ||
            req.body.workGroup === null || req.body.workGroup === '' || req.body.classGroup === null || req.body.classGroup === '') {
            res.send('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        } else {
            u.save(function(err) {
                if (err) {
                    res.send('Error');
                } else {
                    res.send('Created!');
                }
            });
        }
    });

    // delete user
    router.delete('/users/:id', function(req, res) {
        var id = req.params.id;
        User.findByIdAndRemove(id, function(err) {
            if (err) {
                res.send('Error');
            } else {
                res.send('Deleted!');
            }
        });
    });

    // update user
    router.put('/users/:id', function(req, res) {
        var id = req.params.id;
        var obj = req.body;
        User.findByIdAndUpdate(id, {
                username: obj.username,
                password: obj.password,
                firstName: obj.firstName,
                lastName: obj.lastName,
                position: obj.position,
                positionLevel: obj.positionLevel,
                positionCategory: obj.positionCategory,
                positionNumber: obj.positionNumber,
                belongTo: obj.belongTo,
                subjectGroup: obj.subjectGroup,
                workGroup: obj.workGroup,
                classGroup: obj.classGroup,
                permission: obj.permission,
                subjectGroupRole: obj.subjectGroupRole,
                workGroupRole: obj.workGroupRole,
                classGroupRole: obj.classGroupRole
            },
            function(err) {
                if (err) {
                    res.send('Error');
                } else {
                    res.send('Updated!');
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