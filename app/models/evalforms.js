var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

var evalWeightValidator = [
    validate ({
        validator: 'isNumeric',
        arguments: [1, 20],
        message: 'น้ำหนักการประเมินต้องอยู่ระหว่าง {ARGS[0]} ถึง {ARGS[1] เท่านั้น'
    })
];

var evalFormSchema = new Schema ({
    evalFormType: { type: String, required: true },
    evalTopic: { type: String, required: true },
    evalWeight: { type: String, required: true, validate: evalWeightValidator },
    evalCriteria: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EvalForm', evalFormSchema);