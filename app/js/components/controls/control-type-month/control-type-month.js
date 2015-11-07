(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeMonth', ControlTypeMonth);
    function ControlTypeMonth() {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-month/control-type-month.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key': '=parentKey'
            },
            transclude: true
        }
    }
})();