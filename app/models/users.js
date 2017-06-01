var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
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
    subjectGroupRole: { type: String, required: true },
    workGroupRole: { type: String, required: true },
    classGroupRole: { type: String, required: true },
    permission: { type: String, required: true, default: 'user' }
});

userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);