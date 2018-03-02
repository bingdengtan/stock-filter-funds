var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var pageAggregateQuery = function (page, pageSize, Model, aggregate, queryParams, sortParamsBefore, callback) {
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    };
    async.parallel({
        count: function (done) {
            Model.count(queryParams).exec(function (err, count) {
                done(err, count);
            });
        },
        records: function (done) {
            if (sortParamsBefore && sortParamsBefore != undefined) aggregate.unshift({"$sort":sortParamsBefore});
            if (queryParams && queryParams != undefined) aggregate.unshift({"$match":queryParams});
            aggregate.push({$skip: start});
            aggregate.push({$limit: pageSize});
            Model.aggregate(aggregate).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        var count = results.count;
        $page.pageCount = Math.ceil(count / pageSize);
        $page.total = count;
        $page.results = results.records;
        callback(err, $page);
    });
};

var pageFindQuery = function (page, pageSize, Model, populate, queryParams, sortParams, callback) {
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    };
    async.parallel({
        count: function (done) {
            Model.count(queryParams).exec(function (err, count) {
                done(err, count);
            });
        },
        records: function (done) {
            Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        var count = results.count;
        $page.pageCount = Math.ceil(count / pageSize);
        $page.total = count;
        $page.results = results.records;
        callback(err, $page);
    });
};

module.exports = {pageFindQuery: pageFindQuery, pageAggregateQuery: pageAggregateQuery};