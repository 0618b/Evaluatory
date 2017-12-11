var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var present = new Date();
var month = present.getMonth() + 1;
var year = present.getFullYear() + 543;
var nextYear = year + 1;

var otherTemplateSchema = new Schema({
    other_template: [],
    type: String,
    notation: { type: String, default: '-' },
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