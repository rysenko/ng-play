module.exports =  function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.modalShow, function (visible) {
                $(element).modal(visible ? 'show' : 'hide');
            });

            $(element).bind('hide.bs.modal', function () {
                $parse(attrs.modalShow).assign(scope, false);
                if (!scope.$$phase && !scope.$root.$$phase) {
                    scope.$apply();
                }
            });
        }
    };
};