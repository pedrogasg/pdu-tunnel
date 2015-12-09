(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('selectUpdateValues', SelectUpdateValues);
    function SelectUpdateValues(ResourceService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr,ctrl) {
                var field = scope.field;
                function updateValues(key) {
                    return ResourceService.
                        getValues(key).
                        then(function (values) {
                            field.values = values;
                            return values;
                        });
                }

                attr.$observe('keyForValues', function (val) {
                    if (val) {
                        updateValues(val).then(function (values) {
                            if (values.length == 1) {
                                ctrl.$setViewValue(values[0].id);
                                ctrl.$render();
                                scope.tunnel.goToNextInput(field);
                            }
                        });
                    }
                });

            }
        }
    }
    SelectUpdateValues.$inject = ['ResourceService'];
})();
