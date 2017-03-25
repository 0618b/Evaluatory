var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

var evalWeightValidator = [
    validate ({
        validator: 'isNumeric',
        message: 'น้ำหนักการประเมินต้องเป็นตัวเลขเท่านั้น'
    })
];

var evalFormSchema = new Schema ({
    evalFormType: { type: String, required: true },
    evalTopic: { type: String, required: true },
    evalWeight: { type: Number, required: true, validate: evalWeightValidator, min: 1, max: 20 },
    evalCriteria: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EvalForm', evalFormSchema);