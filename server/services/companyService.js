var Company = require('../models/company')
var dbHelper = require('../utils/dbHelper')

exports.list = function(query, pager, callback){
    var aggregate = [];
    return dbHelper.pageAggregateQuery(pager.pageNumber, pager.pageSize, Company, aggregate, query, pager.sort, callback)
}

exports.create = function(req, res){
    
}

exports.getById = function(id, callback){
    return Company
        .findOne({_id: id})
        .exec(callback)
}

exports.update = function(req, res){
    
}

exports.delete = function(req, res){
    
}