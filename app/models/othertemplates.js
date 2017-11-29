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
    isEvaluated: { type: Boolean, default: false }
});

otherTemplateSchema.pre('save', function(next) {
    var ot = this;
    var month = ot.timestamp.month;
    var year = ot.timestamp.year;

    ot.timestamp.evalRound = month + "/" + year;

    next();
})

module.exports = mongoose.model('OtherTemplate', otherTemplateSchema);