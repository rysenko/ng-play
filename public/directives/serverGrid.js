module.exports = function () {
    return {
        scope: {
            columns: '=columns',
            source: '=source'
        },
        templateUrl: 'directives/serverGrid.html',
        controller: function ($scope) {
            $scope.currentPage = 1;
            $scope.pageSizes = [10, 20, 50, 'All'];
            $scope.pageSize = 20;
            $scope.order = '';
            $scope.items = [];

            $scope.refresh = function () {
                var skip = ($scope.currentPage - 1) * $scope.pageSize;
                $scope.source($scope.term, $scope.pageSize, skip, $scope.order).then(function (data) {
                    $scope.items = data.data;
                    $scope.count = data.count;
                    var numPages = Math.ceil($scope.count / $scope.pageSize);
                    $scope.pages = [];
                    for (var i = 1; i <= numPages; i++) {
                        $scope.pages.push(i);
                    }
                });
            };

            $scope.setSorter = function (column) {
                $scope.order = $scope.order === column.field ? '' : column.field;
            };

            $scope.setPage = function (page) {
                $scope.currentPage = page;
            };

            $scope.$watch('term + pageSize + currentPage + order', function () {
                $scope.refresh();
            });
        }
    };
};