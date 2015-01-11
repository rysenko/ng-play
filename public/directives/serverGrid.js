module.exports = function () {
    return {
        scope: {
            columns: '=',
            service: '='
        },
        templateUrl: 'directives/serverGrid.html',
        controller: ['$scope', function ($scope) {
            $scope.skip = 0;
            $scope.pageSizes = [10, 20, 50, 'All'];
            $scope.pageSize = 20;
            $scope.order = '';
            $scope.items = [];

            var isInfinite = function () {
                return $scope.pageSize === 'All';
            };

            $scope.refresh = function (skipIncreased) {
                $scope.loading = true;
                var pageSize = isInfinite() ? 20 : $scope.pageSize;
                $scope.service.list($scope.term, pageSize, $scope.skip, $scope.order).then(function (data) {
                    $scope.items = isInfinite() && skipIncreased ? $scope.items.concat(data.data) : data.data;
                    $scope.count = data.count;
                    var numPages = Math.ceil($scope.count / $scope.pageSize);
                    $scope.pages = [];
                    for (var i = 1; i <= numPages; i++) {
                        $scope.pages.push(i);
                    }
                }).then(function () {
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

            $scope.deleteItem = function (itemToDelete) {
                if (confirm('Delete item?')) {
                    $scope.service.delete(angular.fromJson(angular.toJson(itemToDelete))).then(function () {
                        $scope.items = $scope.items.filter(function (item) {
                            return item !== itemToDelete;
                        });
                    });
                }
            };

            $scope.editItem = function (item) {
                $scope.editingColumn = null;
                $scope.originalItem = item;
                $scope.editingItem = angular.copy(item);
                $scope.showEditing = true;
            };

            $scope.updateItem = function () {
                if ($scope.modalForm.$valid) {
                    $scope.service.update(angular.fromJson(angular.toJson($scope.editingItem))).then(function () {
                        $scope.items = $scope.items.map(function (item) {
                            return $scope.originalItem === item ? $scope.editingItem : item;
                        });
                        $scope.showEditing = false;
                    });

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

            $scope.scroll = function () {
                if ($scope.pageSize === 'All') {
                    $scope.skip = $scope.items.length;
                }
            };

            $scope.$watch('term + pageSize + order', function () {
                $scope.skip = 0;
                $scope.refresh();
            });

            $scope.$watch('skip', function (skip) {
                if (skip > 0) {
                    $scope.refresh(true);
                }
            })
        }]
    };
};