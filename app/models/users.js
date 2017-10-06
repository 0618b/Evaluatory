var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: {
        positionName: String,
        positionLevel: String,
        positionCategory: String,
        positionNumber: String,
    },
    belongTo: { type: String, required: true },
    group: {
        subjectGroup: String,
        workGroup: String,
        classGroup: String,
    },
    groupRole: {
        subjectGroupRole: String,
        workGroupRole: String,
        classGroupRole: String,
    },
    permission: { type: String, required: true },
    selftemplates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SelfTemplate'
    }],
    othertemplates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OtherTemplate'
    }]
});

userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next(); // If password was not changed or is new, ignore middleware

    // function to encrypt the password
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) throw (err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password) {
    var user = this;

    // function to compare the password with the hashed one
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', userSchema);