var Fund = require('../models/fund')
var dbHelper = require('../utils/dbHelper')

exports.list = function(query, pager, callback){
    var aggregate = [];
    var lookup = {
        $lookup:
          {
            from: "fund_company",
            localField: "company_code",
            foreignField: "code",
            as: "company"
          }
     }
    aggregate.push(lookup);
    aggregate.push({$unwind: "$company" });
    aggregate.push({$addFields:{company_name: "$company.name"}});
    aggregate.push({$project: {"company": 0}});

    return dbHelper.pageAggregateQuery(pager.pageNumber, pager.pageSize, Fund, aggregate, query, pager.sort, callback)
}

exports.create = function(req, res){
    
}

exports.getById = function(id, callback){
    return Fund
        .findOne({_id: id})
        .exec(callback)
}

exports.update = function(req, res){
    
}

exports.delete = function(req, res){
    
}