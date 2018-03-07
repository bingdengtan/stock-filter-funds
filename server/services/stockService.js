var Stock = require('../models/stock')
var dbHelper = require('../utils/dbHelper')

exports.filter = function(query, callback){
    var sort = {code: 1}
    var aggregate = [];
    aggregate.push({$project: {"code": 1, "name": 1}});

    return dbHelper.pageAggregateQuery(1, 20, Stock, aggregate, query, sort, callback)
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