﻿(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypePhone', ControlTypePhone);
    function ControlTypePhone(elementBindService) {
        return {
            restrict: 'A',
            templateUrl: '/js/components/controls/control-type-phone/control-type-phone.html',
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
    ControlTypePhone.$inject = ['elementBindService'];
})();
