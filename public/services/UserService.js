module.exports = ['$http', function ($http) {
    this.list = function (term, limit, skip, order) {
        return $http.get('/data', {params: {
            term: term,
            limit: limit,
            skip: skip,
            order: order
        }}).then(function (response) {
            return response.data;
        });
    };
}];