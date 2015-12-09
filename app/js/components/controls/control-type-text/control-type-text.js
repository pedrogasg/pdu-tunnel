(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeText', ControlTypeText);
    function ControlTypeText(elementBindService) {
        return {
            restrict: 'A',
            templateUrl: '/js/components/controls/control-type-text/control-type-text.html',
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
    ControlTypeText.$inject = ['elementBindService'];
})();
