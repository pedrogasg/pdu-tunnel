(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeSelect', ControlTypeSelect);
    function ControlTypeSelect(elementBindService) {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-select/control-type-select.html',
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

    ControlTypeSelect.$inject = ['elementBindService'];
})();
