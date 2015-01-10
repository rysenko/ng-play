module.exports = function () {
    return {
        scope: {
            columns: '=',
            service: '='
        },
        templateUrl: 'directives/serverGrid.html',
        controller: ['$scope', '$timeout', function ($scope, $timeout) {
            $scope.skip = 0;
            $scope.pageSizes = [10, 20, 50, 'All'];
            $scope.pageSize = 20;
            $scope.order = '';
            $scope.items = [];
            $scope.loading = true;
            var loadingTimeout;

            $scope.refresh = function () {
                loadingTimeout = $timeout(function () {
                    $scope.loading = true;
                }, 200);
                $scope.service.list($scope.term, $scope.pageSize, $scope.skip, $scope.order).then(function (data) {
                    $scope.items = data.data;
                    $scope.count = data.count;
                    var numPages = Math.ceil($scope.count / $scope.pageSize);
                    $scope.pages = [];
                    for (var i = 1; i <= numPages; i++) {
                        $scope.pages.push(i);
                    }
                }).then(function () {
                    $timeout.cancel(loadingTimeout);
                    $scope.loading = false;
                });
            };

            $scope.setSorter = function (column) {
                var reverseField = '-' + column.field;
                if ($scope.order === column.field) {
                    $scope.order = reverseField;
                } else if ($scope.order === reverseField) {
                    $scope.order = '';
                } else {
                    $scope.order = column.field;
                }
            };

            $scope.currentPage = function () {
                return Math.ceil($scope.skip / $scope.pageSize) + 1;
            };

            $scope.setPage = function (page) {
                $scope.skip = (page - 1) * $scope.pageSize;
            };

            $scope.deleteItem = function (item) {
                if (confirm('Delete item?')) {
                    $scope.service.delete(angular.fromJson(angular.toJson(item))).then($scope.refresh);
                }
            };

            $scope.editItem = function (item) {
                $scope.editingItem = angular.copy(item);
                $scope.showEditing = true;
            };

            $scope.updateItem = function () {
                if ($scope.modalForm.$valid) {
                    $scope.service.update(angular.fromJson(angular.toJson($scope.editingItem))).then($scope.refresh);
                    $scope.showEditing = false;
                }
            };

            $scope.editCell = function (item, column) {
                if (!$scope.isEditCell(item, column)) {
                    $scope.editingItem = angular.copy(item);
                    $scope.originalItem = item;
                    $scope.editingColumn = column;
                }
            };

            $scope.isEditCell = function (item, column) {
                return $scope.originalItem === item && $scope.editingColumn === column;
            };

            $scope.updateCell = function () {
                if ($scope.editorForm.$valid) {
                    $scope.updateItem();
                    $scope.editingColumn = null;
                }
            };

            $scope.$watch('term + pageSize + skip + order', function () {
                $scope.refresh();
            });
        }]
    };
};