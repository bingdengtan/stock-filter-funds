var mongoose = require('mongoose');
var schema = mongoose.Schema;

var StockSchema = new schema(
    {
        code: {type: String, required: true},
        name: {type: String, required: true},
        creation_date: {type: Date},
        creation_by: {type: String},
        last_updated_date: {type: Date},
        last_updated_by: {type: Date}
    }, 
    {
        collection: "stock"
    }
)

module.exports = mongoose.model('Stock', StockSchema);