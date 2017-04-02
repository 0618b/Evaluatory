var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var otherHeaderSchema = new Schema ({
    other_header: {}
});

module.exports = mongoose.model('OtherHeader', otherHeaderSchema);