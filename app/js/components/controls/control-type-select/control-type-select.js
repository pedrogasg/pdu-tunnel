(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeSelect', ControlTypeSelect);
    function ControlTypeSelect() {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-select/control-type-select.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key': '=parentKey'
            },
            transclude: true
        }
    }
})();