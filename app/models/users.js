var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema ({
    username: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    positionLevel: { type: String, required: true },
    positionCategory: { type: String, required: true },
    positionNumber: { type: String, required: true, unique: true },
    belongTo: { type: String, required: true },
    subjectGroup: { type: String, required: true },
    workGroup: { type: String, required: true },
    classGroup: { type: String, required: true },
    permission: { type: String, default: 'user' },
    subjectGroupRole: { type: String, default: 'member' },
    workGroupRole: { type: String, default: 'member' },
    classGroupRole: { type: String, default: 'member' },
    //profileImg: File,
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);