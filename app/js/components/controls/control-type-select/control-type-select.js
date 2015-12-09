(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeSelect', ControlTypeSelect);
    function ControlTypeSelect(elementBindService, ResourceService) {
        return {
            restrict: 'A',
            templateUrl: '/js/components/controls/control-type-select/control-type-select.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key': '=parentKey'
            },
            transclude: true,
            link: function (scope, elm, attr) {
                elementBindService.initElementBindings(elm, scope);
                function updateValues(key) {
                    ResourceService.
                        getValues(key).
                        then(function (values) {
                            field.values = values;
                        });
                }
                //var field = scope.field;
                //if (field.keyForValues) {
                //    updateValues(field.keyForValues);   
                //}
                //if (field.keyForValuesRoot) {
                //    field.resourceHooks.push(function (f) {
                //        updateValues(f.keyForValues);
                //    });
                //}
                
            }
        }
    }

    ControlTypeSelect.$inject = ['elementBindService','ResourceService'];
})();
