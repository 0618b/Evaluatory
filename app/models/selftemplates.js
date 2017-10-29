var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var present = new Date();
var month = present.getMonth() + 1;
var year = present.getFullYear() + 543;

var selfTemplateSchema = new Schema({
    self_template: {},
    totalScore: { type: Number, default: 0 },
    evaluatedBy: { type: String, ref: 'User' },
    timestamp: {
        month: { type: Number, default: month },
        year: { type: Number, default: year }
    },
    status: { type: Boolean, default: false }

});

module.exports = mongoose.model('SelfTemplate', selfTemplateSchema);