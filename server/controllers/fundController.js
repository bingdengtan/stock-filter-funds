var pageBean = require('../utils/pageBean')
var fundService = require("../services/fundService")

exports.list = function(req, res, next){
    let query = req.body.query;
    let pager = pageBean.pagerFromRequest(req);  
    fundService.list(query, pager, function(err, results){
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