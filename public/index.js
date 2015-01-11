angular.module('main', ['infinite-scroll'])
    .controller('MainController', require('./controllers/MainController'))
    .service('UserService', require('./services/UserService'))
    .directive('serverGrid', require('./directives/serverGrid'))
    .directive('modalShow', require('./directives/modalShow'))
    .directive('editControl', require('./directives/editControl'));