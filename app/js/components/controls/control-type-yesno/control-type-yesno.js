(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeYesno', ControlTypeYesNo);
    function ControlTypeYesNo() {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/controls/control-type-yesno/control-type-yesno.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key': '=parentKey'
            },
            transclude: true
        }
    }
})();