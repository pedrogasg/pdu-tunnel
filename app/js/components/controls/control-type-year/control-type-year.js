(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeYear', ControlTypeYear);
    function ControlTypeYear() {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-year/control-type-year.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key':'=parentKey'
            },
            transclude: true,
            link: function (scope, elm, attr) {
                console.log(elm);
                scope.field['element'] = elm;
            }
        }
    }
})();