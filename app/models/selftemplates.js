var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear() + 543;

if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}

today = dd + '/' + mm + '/' + yyyy;

var selfTemplateSchema = new Schema({
    header: {},
    self_template: {},
    totalScore: { type: Number, default: 0 },
    created: { type: String, default: today },
    updated: { type: String, default: today },
    isCloned: { type: Boolean, default: false },
    isSubmitted: { type: Boolean, default: false },
    evaluatedBy: { type: String, ref: 'User' }
});

selfTemplateSchema.pre('save', function(next) {
    var selftemplate = this;
    selftemplate.updated = today;
    if (!selftemplate.created) {
        selftemplate.created = today;
    }
    next();
})

module.exports = mongoose.model('SelfTemplate', selfTemplateSchema);