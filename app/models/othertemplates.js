var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var otherTemplateSchema = new Schema ({
    other_template: {}
});

module.exports = mongoose.model('OtherTemplate', otherTemplateSchema);
