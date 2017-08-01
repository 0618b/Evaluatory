var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var selfTemplateSchema = new Schema({
    header: {},
    self_template: {},
    totalScore: { type: String, default: 0 },
    created: { type: Date, default: Date.now },
    updated: { type: Date },
    isCloned: { type: Boolean, default: false },
    isSubmitted: { type: Boolean, default: false },
    evaluatedBy: { type: String, ref: 'User' }
});

module.exports = mongoose.model('SelfTemplate', selfTemplateSchema);