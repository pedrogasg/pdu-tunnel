(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypePhone', ControlTypePhone);
    function ControlTypePhone() {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-phone/control-type-phone.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key':'=parentKey'
            },
            transclude: true,
            link: function (scope, elm, attr) {
                scope.field['element'] = elm;
            }
        }
    }
})();