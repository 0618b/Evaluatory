var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var selfTemplateSchema = new Schema ({
    self_template: {}
});

module.exports = mongoose.model('SelfTemplate', selfTemplateSchema);