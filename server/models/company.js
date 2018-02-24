var mongoose = require('mongoose');
var schema = mongoose.Schema;

var CompanySchema = new schema(
    {
        code: {type: String, required: true},
        name: {type: String, required: true},
        creation_date: {type: Date},
        creation_by: {type: String},
        last_updated_date: {type: Date},
        last_updated_by: {type: Date}
    }, 
    {
        collection: "fund_company"
    }
)

CompanySchema
    .virtual('url')
    .get(function () {
        return '/company/' + this._id;
    });

module.exports = mongoose.model('Company', CompanySchema);