var mongoose = require('mongoose');
var schema = mongoose.Schema;

var FundStockSchema = new schema(
    {
        fund_code: {type: String, required: true},
        year: {type: Number},
        month: {type: Number},
        total: {type: Number},
        weight: {type: Number},
        quantity: {type: Number},
        stock_code: {type: String, required: true},
        stock_name: {type: String, required: true},
        creation_date: {type: Date},
        creation_by: {type: String},
        last_updated_date: {type: Date},
        last_updated_by: {type: Date}
    }, 
    {
        collection: "fund_stock"
    }
)

module.exports = mongoose.model('FundStock', FundStockSchema);