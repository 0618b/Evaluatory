var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var selfTemplateSchema = new Schema({
    self_template: {},
    totalScore: { type: String, default: 0 },
    isCloned: { type: Boolean, default: false },
    isSubmitted: { type: Boolean, default: false }
});

module.exports = mongoose.model('SelfTemplate', selfTemplateSchema);