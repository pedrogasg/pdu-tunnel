(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeMonth', ControlTypeMonth);
    function ControlTypeMonth(elementBindService) {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-month/control-type-month.html',
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
    ControlTypeMonth.$inject = ['elementBindService'];
})();
