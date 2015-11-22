(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeDate', ControlTypeDate);
    function ControlTypeDate(elementBindService) {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-date/control-type-date.html',
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
    ControlTypeDate.$inject = ['elementBindService'];
})();
