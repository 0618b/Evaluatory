var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var today = new Date();
var date = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();


var selfTemplateSchema = new Schema({
    header: {},
    self_template: {},
    totalScore: { type: String, default: 0 },
    created: { type: String, default: date },
    updated: { type: String, default: date },
    isCloned: { type: Boolean, default: false },
    isSubmitted: { type: Boolean, default: false },
    evaluatedBy: { type: String, ref: 'User' }
});

module.exports = mongoose.model('SelfTemplate', selfTemplateSchema);