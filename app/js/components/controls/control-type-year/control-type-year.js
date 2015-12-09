(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeYear', ControlTypeYear);
    function ControlTypeYear(elementBindService) {
        return {
            restrict: 'A',
            templateUrl: '/js/components/controls/control-type-year/control-type-year.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key':'=parentKey'
            },
            transclude: true,
            link: function (scope, elm, attr) {
                elementBindService.initElementBindings(elm,scope);
            }
        }
    }
    ControlTypeYear.$inject = ['elementBindService'];
})();
