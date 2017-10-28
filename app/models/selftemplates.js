var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var present = new Date();
var month = present.getMonth() + 1;
var year = present.getFullYear() + 543;

var selfTemplateSchema = new Schema({
    self_template: {},
    totalScore: { type: Number, default: 0 },
    isCloned: { type: Boolean, default: false },
    isSubmitted: { type: Boolean, default: false },
    evaluatedBy: { type: String, ref: 'User' },
    timestamp: {
        month: { type: Number, default: month },
        year: { type: Number, default: year }
    }
});

module.exports = mongoose.model('SelfTemplate', selfTemplateSchema);