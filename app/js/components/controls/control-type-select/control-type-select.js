(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('controlTypeSelect', ControlTypeSelect);
    function ControlTypeSelect() {
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
                scope.field['element'] = elm;
                elm.on('mousedown', function (e) {
                    if (!elm[0].firstElementChild.classList.contains('focused')) {
                        e.preventDefault();
                        var field = scope.field,
                            input = elm.find(field.subtype);
                        input[0].focus();
                    }
                });
            }
        }
    }
})();