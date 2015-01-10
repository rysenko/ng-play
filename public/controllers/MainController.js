module.exports = ['$scope', 'UserService', function ($scope, UserService) {
    $scope.columns = [
        {
            field: 'FirstName',
            caption: 'First Name'
        },
        {
            field: 'LastName',
            caption: 'Last Name'
        },
        {
            field: 'Email',
            caption: 'Email'
        },
        {
            field: 'Age',
            caption: 'Age'
        },
        {
            field: 'Gender',
            caption: 'Gender'
        }
    ];
    $scope.source = UserService.list;
}];