(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeMoney', ControlTypeMoney);
    function ControlTypeMoney() {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-money/control-type-money.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key': '=parentKey'
            },
            transclude: true
        }
    }
})();