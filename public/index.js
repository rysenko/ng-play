require('./lib/angularjs/angular');

angular.module('main', [])
    .controller('MainController', require('./controllers/MainController'))
    .service('UserService', require('./services/UserService'))
    .directive('serverGrid', require('./directives/serverGrid'));