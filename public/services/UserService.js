module.exports = ['$http', function ($http) {
    this.list = function (term, limit, skip, order) {
        return $http.get('/users', {params: {
            term: term,
            limit: limit,
            skip: skip,
            order: order
        }}).then(function (response) {
            return response.data;
        });
    };
    this.update = function (user) {
        return $http({
            method : 'POST',
            url    : '/users',
            data   : user,
            headers: {'Content-Type': 'application/json'}
        });
    };
    this.delete = function (user) {
        return $http({
            method : 'DELETE',
            url    : '/users',
            data   : user,
            headers: {'Content-Type': 'application/json'}
        });
    };
}];