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
    bcrypt.hash(this.password, null, null, function(err, hash) {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);