var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var selfHeaderSchema = new Schema ({
    self_header: {}
});

module.exports = mongoose.model('SelfHeader', selfHeaderSchema);