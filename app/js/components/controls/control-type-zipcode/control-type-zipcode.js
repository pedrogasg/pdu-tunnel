(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeZipcode', ControlTypeZipcode);
    function ControlTypeZipcode(elementBindService) {
        return {
            restrict: 'A',
            templateUrl: '/js/components/controls/control-type-zipcode/control-type-zipcode.html',
            scope: {
                'tunnel': '=parentTunnel',
                'field': '=field',
                'key': '=parentKey'
            },
            transclude: true,
            link: function (scope, elm, attr) {
                elementBindService.initElementBindings(elm, scope);
            }
        }
    }
    ControlTypeZipcode.$inject = ['elementBindService'];
})();
