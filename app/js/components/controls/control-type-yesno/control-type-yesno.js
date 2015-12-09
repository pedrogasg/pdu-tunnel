(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeYesno', ControlTypeYesNo);
    function ControlTypeYesNo(elementBindService) {
        return {
            restrict: 'A',
            templateUrl: '/js/components/controls/control-type-yesno/control-type-yesno.html',
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
    ControlTypeYesNo.$inject = ['elementBindService'];
})();
