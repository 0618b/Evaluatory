var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var present = new Date();
var month = present.getMonth() + 1;
var year = present.getFullYear() + 543;

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
    notation: String,
    receipients: { type: Schema.Types.ObjectId, ref: 'User' },
    evaluatedBy: { type: String, ref: 'User' },
    timestamp: {
        month: { type: Number, default: month },
        year: { type: Number, default: year },
        evalRound: ''
    },
    totalScore: { type: Number, default: 0 },
    isEvaluated: { type: Number, default: 0 }
});

otherTemplateSchema.pre('save', function(next) {
    var ot = this;
    var month = ot.timestamp.month;
    var other_template = ot.other_template;

    if (month = 1) {
        ot.timestamp.evalRound = 1 + "/" + year;
    } else if (month = 2) {
        ot.timestamp.evalRound = 2 + "/" + year;
    } else if (month = 3) {
        ot.timestamp.evalRound = 3 + "/" + year;
    } else if (month = 4) {
        ot.timestamp.evalRound = 4 + "/" + year;
    } else if (month = 5) {
        ot.timestamp.evalRound = 5 + "/" + year;
    } else if (month = 6) {
        ot.timestamp.evalRound = 6 + "/" + year;
    } else if (month = 7) {
        ot.timestamp.evalRound = 7 + "/" + year;
    } else if (month = 8) {
        ot.timestamp.evalRound = 8 + "/" + year;
    } else if (month = 9) {
        ot.timestamp.evalRound = 9 + "/" + year;
    } else if (month = 10) {
        ot.timestamp.evalRound = 10 + "/" + year;
    } else if (month = 11) {
        ot.timestamp.evalRound = 11 + "/" + year;
    } else if (month = 12) {
        ot.timestamp.evalRound = 12 + "/" + year;
    }

    for (var i = 0; i < other_template.length; i++) {
        ot.totalScore += other_template[i];
        ot.isEvaluated++
    }

    next();
})

module.exports = mongoose.model('OtherTemplate', otherTemplateSchema);