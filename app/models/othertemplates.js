var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var otherTemplateSchema = new Schema({
    header: {},
    other_template: {},
    totalScore: { type: String, default: 0 },
    isCloned: { type: Boolean, default: false },
    isSubmitted: { type: Boolean, default: false },
    evaluatedBy: {
        type: String,
        ref: 'User'
    }
});

module.exports = mongoose.model('OtherTemplate', otherTemplateSchema);