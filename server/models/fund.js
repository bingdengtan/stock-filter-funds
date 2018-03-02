var mongoose = require('mongoose');
var schema = mongoose.Schema;

var FundSchema = new schema(
    {
        code: {type: String, required: true},
        name: {type: String, required: true},
        name_ping_yin: {type: String, required: true},
        company_code: {type: String, required: true},
        creation_date: {type: Date},
        creation_by: {type: String},
        last_updated_date: {type: Date},
        last_updated_by: {type: Date}
    }, 
    {
        collection: "fund_fund"
    }
)

module.exports = mongoose.model('Fund', FundSchema);