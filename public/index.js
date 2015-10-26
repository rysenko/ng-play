require('./index.css');
global.jQuery = global.$ = require('jquery');
require('bootstrap/dist/js/bootstrap');
var angular = require('angular');
require('./vendor/ng-infinite-scroll');
angular.module('main', ['infinite-scroll'])
    .controller('MainController', require('./controllers/MainController'))
    .service('UserService', require('./services/UserService'))
    .directive('serverGrid', require('./directives/serverGrid'))
    .directive('modalShow', require('./directives/modalShow'))
    .directive('editControl', require('./directives/editControl'));