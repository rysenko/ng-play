var generator = require('./generator');

var UserStore = (function () {
    function UserStore(numUsers) {
        this.users = generator.getUsers(numUsers);
    }
    UserStore.prototype.list = function (term, limit, skip, order, callback) {
        var result = this.users.slice();
        if (order) {
            result.sort(function (a, b) {
                if (typeof a[order] === 'string') {
                    return a[order].localeCompare(b[order]);
                }
                return a[order] - b[order];
            });
        }
        if (term) {
            result = result.filter(function (item) {
                return Object.keys(item).some(function (key) {
                    return typeof item[key] === 'string' && item[key].indexOf(term) !== -1 || item[key] == term;
                });
            });
        }
        var count  = result.length;
        if (skip) {
            result = result.slice(skip);
        }
        if (limit && result.length > limit) {
            result.length = limit;
        }
        setImmediate(function () {
            callback(null, {data: result, count: count});
        });
    };
    return UserStore;
})();

module.exports = new UserStore(105);