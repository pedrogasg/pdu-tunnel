(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeInsurance', ControlTypeInsurance);
    function ControlTypeInsurance(elementBindService) {
        return {
            restrict: 'A',
            templateUrl: '/js/components/controls/control-type-insurance/control-type-insurance.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key': '=parentKey'
            },
            transclude: true,
            link: function (scope, elm, attr) {
                elementBindService.initElementBindings(elm, scope);
            }
        }
    }
    ControlTypeInsurance.$inject = ['elementBindService'];
})();
