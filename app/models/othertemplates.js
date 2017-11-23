var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var otherTemplateSchema = new Schema({
    other_template: {},
    evaluatedBy: { type: String, ref: 'User' },
    timestamp: {
        month: { type: Number, default: month },
        year: { type: Number, default: year },
        evalRound: ''
    },
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