module.exports = ['$scope', 'UserService', function ($scope, UserService) {
    $scope.columns = [
        {
            field: 'FirstName',
            caption: 'First Name',
            pattern: '^[\\w-]+$',
            required: true
        },
        {
            field: 'LastName',
            caption: 'Last Name',
            pattern: '^[\\w-]+$',
            required: true
        },
        {
            field: 'Email',
            caption: 'Email',
            type: 'email',
            required: true
        },
        {
            field: 'Age',
            caption: 'Age',
            type: 'number',
            required: true
        },
        {
            field: 'Gender',
            caption: 'Gender',
            required: true,
            options: {
                Male: 'Male',
                Female: 'Female'
            }
        }
    ];
    $scope.service = UserService;
}];