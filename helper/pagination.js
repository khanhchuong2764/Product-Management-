module.exports = (ObjectPagination,query,countRecord) => {
    if (query.page) {
        ObjectPagination.currentPage = parseInt(query.page);
    }
    ObjectPagination.skip = (ObjectPagination.currentPage -1) * ObjectPagination.limititem;
    ObjectPagination.totalPage = Math.ceil((countRecord/ObjectPagination.limititem));
    return ObjectPagination;
}