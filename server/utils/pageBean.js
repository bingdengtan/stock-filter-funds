var pager = {
    pageNumber : 1,  //current page
    pageSize : 10,   //page size
    sort : {}        //sort parameter
}

var fromRequest = function(req) {
    let pageNumber = req.body.pageNumber;
    let pageSize = req.body.pageSize;
    let sortBy = req.body.sortBy;
    let orderBy = req.body.orderBy;

    var _pager = pager;
    if (pageNumber) _pager.pageNumber = parseInt(pageNumber);
    if (pageSize) _pager.pageSize = parseInt(pageSize);
    if (sortBy){
        if (!orderBy){
            orderBy = 1;
        } else {
            orderBy = orderBy == 'desc' ? -1 : 1;
        }
        let _sort = {};
        _sort[sortBy] = orderBy;
        _pager.sort = _sort
    }  
    return _pager;  
}

module.exports = {pager: pager, pagerFromRequest: fromRequest};