var pageBean = require('../utils/pageBean')
var companyService = require("../services/companyService")

exports.list = function(req, res){
    var query = {};
    var pager = pageBean.pager;
    pager.sort = {"name_ping_yin":1}
    
    companyService.list(query, pager, function(err, results){
        if(err){
            console.log(err)
        }else{
            res.send(results)
        }
    })
}

exports.create = function(req, res){
    
}

exports.get = function(req, res){
    
}

exports.update = function(req, res){
    
}

exports.delete = function(req, res){
    
}