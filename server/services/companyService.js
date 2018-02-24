var Company = require('../models/company')
var dbHelper = require('../utils/dbHelper')

exports.list = function(query, pager, callback){
    return dbHelper.pageQuery(pager.pageNumber, pager.pageSize, Company, '', query, pager.sort, callback)
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