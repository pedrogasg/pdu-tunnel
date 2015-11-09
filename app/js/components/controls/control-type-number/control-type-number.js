(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeNumber', ControlTypeNumber);
    function ControlTypeNumber() {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-number/control-type-number.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key': '=parentKey'
            },
            transclude: true,
            link: function (scope, elm, attr) {
                scope.field['element'] = elm;
            }
        }
    }

})();