var pageBean = require('../utils/pageBean')
var stockService = require("../services/stockService")

exports.filter = function(req, res, next){
    let term = req.params.query

    query = []
    query.push({code: {$regex: term + ".*", $options: "i"}})
    query.push({name: {$regex: ".*" + term + ".*", $options: "i"}})
    query.push({name_ping_yin: {$regex: ".*" + term + ".*", $options: "i"}})

    stockService.filter({$or: query}, function(err, results){
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