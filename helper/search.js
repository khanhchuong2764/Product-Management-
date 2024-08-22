module.exports = (query) => {
    const ObjectSearch = {
        keyword:""
    }
    if (query.keyword) {
        ObjectSearch.keyword=query.keyword
        const regex = new RegExp(ObjectSearch.keyword,"i");
        ObjectSearch.regex = regex;
    }
    return ObjectSearch;
}