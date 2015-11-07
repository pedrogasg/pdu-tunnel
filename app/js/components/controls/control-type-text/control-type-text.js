(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeText', ControlTypeText);
    function ControlTypeText() {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-text/control-type-text.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key':'=parentKey'
            },
            transclude: true
        }
    }
})();