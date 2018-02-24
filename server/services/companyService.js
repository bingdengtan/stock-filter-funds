var Company = require('../models/company')
var dbHelper = require('../utils/dbHelper')

exports.list = function(callback){
    var page = 1
    return dbHelper.pageQuery(page, 11, Company, '', {}, {
        name_ping_yin: 1
    },callback)
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