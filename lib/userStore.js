var generator = require('./generator');

var UserStore = (function () {
    function UserStore(numUsers) {
        this.users = generator.getUsers(numUsers);
    }
    UserStore.prototype.list = function (term, limit, skip, order, callback) {
        var result = this.users.slice();
        if (order) {
            var field = order.charAt(0) === '-' ? order.slice(1) : order;
            result.sort(function (a, b) {
                if (typeof a[field] === 'string') {
                    return a[field].localeCompare(b[field]);
                }
                return a[field] - b[field];
            });
            if (order.charAt(0) === '-') {
                result.reverse();
            }
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
    UserStore.prototype.update = function (user, callback) {
        this.users = this.users.map(function (item) {
            return item.Id === user.Id ? user : item;
        });
        setImmediate(function () {
            callback(null, user);
        });
    };
    UserStore.prototype.delete = function (user, callback) {
        this.users = this.users.filter(function (item) {
            return item.Id !== user.Id
        });
        setImmediate(function () {
            callback(null);
        });
    };
    return UserStore;
})();

module.exports = new UserStore(105);