var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var present = new Date();
var month = present.getMonth() + 1;
var year = present.getFullYear() + 543;
var nextYear = year + 1;

var otherTemplateSchema = new Schema({
    other_template: {
        q1: Number,
        q2: Number,
        q3: Number,
        q4: Number,
        q5: Number,
        q6: Number,
        q7: Number,
        q8: Number,
        q9: Number,
        q10: Number,
        q11: Number,
        q12: Number,
        q13: Number,
        q14: Number,
        q15: Number,
        q16: Number,
        q17: Number,
        q18: Number,
        q19: Number,
        q20: Number,
        q21: Number,
        q22: Number,
        q23: Number,
        q24: Number,
        q25: Number,
        q26: Number,
        q27: Number,
        q28: Number,
    },
    type: String,
    notation: String,
    evaluatedFor: { type: Schema.Types.ObjectId, ref: 'User' },
    evaluatedBy: { type: String, ref: 'User' },
    timestamp: {
        month: { type: Number, default: month },
        year: { type: Number, default: year },
        evalRound: ''
    }
});

otherTemplateSchema.pre('save', function(next) {
    var ot = this;
    var month = ot.timestamp.month;
    var year = ot.timestamp.year;

    if (month >= 10 && month <= 12 || month >= 1 && month <= 3) {
        ot.timestamp.evalRound = 1 + "/" + year + "-" + nextYear;
    } else if (month >= 4 && month <= 9) {
        ot.timestamp.evalRound = 2 + "/" + year;
    }

    next();
})

module.exports = mongoose.model('OtherTemplate', otherTemplateSchema);