var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var present = new Date();
var month = present.getMonth() + 1;
var year = present.getFullYear() + 543;

var selfTemplateSchema = new Schema({
    self_template: {},
    evaluatedBy: { type: String, ref: 'User' },
    timestamp: {
        month: { type: Number, default: month },
        year: { type: Number, default: year },
        evalRound: ''
    },
    totalScore: { type: Number, default: 0 },
    totalWeight: { type: Number, default: 0 },
    isEvaluated: { type: Boolean, default: false }
});

selfTemplateSchema.pre('save', function(next) {
    var st = this;
    var month = st.timestamp.month;

    if (month >= 10 && month <= 12 || month >= 1 && month <= 3) {
        st.timestamp.evalRound = 1 + "/" + year;
    } else if (month >= 4 && month <= 9) {
        st.timestamp.evalRound = 2 + "/" + year;
    }

    s0 = st.self_template.sectionGroup[0].choiceGroupList[0].choiceList[0].score;
    s1 = st.self_template.sectionGroup[0].choiceGroupList[0].choiceList[1].score;
    s2 = st.self_template.sectionGroup[0].choiceGroupList[0].choiceList[2].score;
    s3 = st.self_template.sectionGroup[0].choiceGroupList[0].choiceList[3].score;
    s4 = st.self_template.sectionGroup[0].choiceGroupList[0].choiceList[4].score;
    s5 = st.self_template.sectionGroup[0].choiceGroupList[1].choiceList[0].score;
    s6 = st.self_template.sectionGroup[0].choiceGroupList[1].choiceList[1].score;
    s7 = st.self_template.sectionGroup[0].choiceGroupList[1].choiceList[2].score;
    s8 = st.self_template.sectionGroup[0].choiceGroupList[2].choiceList[0].score;
    s9 = st.self_template.sectionGroup[0].choiceGroupList[2].choiceList[1].score;

    w0 = st.self_template.sectionGroup[0].choiceGroupList[0].choiceList[0].evalWeight;
    w1 = st.self_template.sectionGroup[0].choiceGroupList[0].choiceList[1].evalWeight;
    w2 = st.self_template.sectionGroup[0].choiceGroupList[0].choiceList[2].evalWeight;
    w3 = st.self_template.sectionGroup[0].choiceGroupList[0].choiceList[3].evalWeight;
    w4 = st.self_template.sectionGroup[0].choiceGroupList[0].choiceList[4].evalWeight;
    w5 = st.self_template.sectionGroup[0].choiceGroupList[1].choiceList[0].evalWeight;
    w6 = st.self_template.sectionGroup[0].choiceGroupList[1].choiceList[1].evalWeight;
    w7 = st.self_template.sectionGroup[0].choiceGroupList[1].choiceList[2].evalWeight;
    w8 = st.self_template.sectionGroup[0].choiceGroupList[2].choiceList[0].evalWeight;
    w9 = st.self_template.sectionGroup[0].choiceGroupList[2].choiceList[1].evalWeight;

    var score_arr = [s0, s1, s2, s2, s4, s5, s6, s7, s8, s9];
    var evalWeight_arr = [w0, w1, w2, w3, w4, w5, w6, w7, w8, w9];

    for (var i = 0; i < score_arr.length; i++) {
        st.totalScore += score_arr[i];
    }

    for (var i = 0; i < evalWeight_arr.length; i++) {
        st.totalWeight += evalWeight_arr[i];
    }

    next();

});


module.exports = mongoose.model('SelfTemplate', selfTemplateSchema);