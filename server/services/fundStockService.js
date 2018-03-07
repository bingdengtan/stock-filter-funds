var FundStock = require('../models/fundStock')
var dbHelper = require('../utils/dbHelper')

exports.filter = function(query, callback){
    var sort = {code: 1}
    var aggregate = [];
    aggregate.push({$project: {"code": 1, "name": 1}});

    return dbHelper.pageAggregateQuery(1, 20, FundStock, aggregate, query, sort, callback)
}

exports.searchFunds = function(stock_code, pager, callback){
    var aggregate = [];

    var now = new Date();

    var month = now.getMonth();
    if((month + 1) % 3 != 0){   //only to 3, 6, 9 or 12
        var month = Math.ceil(month / 3 ) * 3
        now.setMonth(month)
    }
    var month = now.getMonth();
    var datePassThree = new Date();
    if(month + 1 <= 3){
        datePassThree.setFullYear(datePassThree.getFullYear() - 1)
        datePassThree.setMonth(11)
    }else{
        datePassThree.setMonth(month - 3);
    }

    var datePassSix = new Date()
    if(month + 1 <= 6){
        datePassSix.setFullYear(datePassSix.getFullYear() - 1)
        datePassSix.setMonth(month + 6)
    }else{
        datePassSix.setMonth(month - 6);
    }   

    var ors = []
    ors.push({year: datePassThree.getFullYear(), month: datePassThree.getMonth() + 1})
    ors.push({year: datePassSix.getFullYear(), month: datePassSix.getMonth() + 1})

    var query = {$and: [{stock_code: stock_code}, {$or: ors}]}
    var match = {$match: query};
    aggregate.push(match);
    aggregate.push({$sort: {fund_code: -1, year: -1, month: -1}})

    var group = {
        "_id": "$fund_code",
        "id": {$first: "$_id"},
        "fund_code": {$first: "$fund_code"},
        "stock_name": {$first: "$stock_name"},        
        "year": {$first: "$year"},
        "month": {$first: "$month"},
        "total": {$first: "$total"},
        "quantity": {$first: "$quantity"},
        "weight": {$first: "$weight"}
    }
    aggregate.push({$group: group})

    var lookup = {
        from: "fund_fund",
        localField: "fund_code",
        foreignField: "code",
        as: "fund"
    }

    aggregate.push({$lookup: lookup});
    aggregate.push({$unwind: "$fund" });
    aggregate.push({$addFields:{fund_name: "$fund.name", fund_name_ping_yin: "$fund.name_ping_yin"}});
    aggregate.push({$project: {fund: 0, _id: 0}});
    aggregate.push({$sort: {year: -1, month: -1, weight: -1, fund_name_ping_yin: 1}})
    return dbHelper.pageAggregateQuery(pager.pageNumber, pager.pageSize, FundStock, aggregate, query, null, callback)
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