(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeMoney', ControlTypeMoney);
    function ControlTypeMoney(elementBindService) {
        return {
            restrict: 'A',
            templateUrl: '/js/components/controls/control-type-money/control-type-money.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key': '=parentKey'
            },
            transclude: true,
            link: function (scope, elm, attr) {
              elementBindService.initElementBindings(elm,scope);
            }
        }
    }
    ControlTypeMoney.$inject = ['elementBindService'];
})();
