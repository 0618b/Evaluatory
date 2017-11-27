var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var present = new Date();
var month = present.getMonth() + 1;
var year = present.getFullYear() + 543;

var otherTemplateSchema = new Schema({
    other_template: {
        question: [Number],
        notation: String
    },
    receipients: { type: String, ref: 'User' },
    evaluatedBy: { type: String, ref: 'User' },
    timestamp: {
        month: { type: Number, default: month },
        year: { type: Number, default: year },
        evalRound: ''
    },
    totalScore: { type: Number, default: 0 },
    isEvaluated: { type: Boolean, default: false }
});

otherTemplateSchema.pre('save', function(next) {
    var ot = this;
    var month = ot.timestamp.month;

    if (month >= 10 && month <= 12 || month >= 1 && month <= 3) {
        ot.timestamp.evalRound = 1 + "/" + year;
    } else if (month >= 4 && month <= 9) {
        ot.timestamp.evalRound = 2 + "/" + year;
    }

    next();
})

module.exports = mongoose.model('OtherTemplate', otherTemplateSchema);