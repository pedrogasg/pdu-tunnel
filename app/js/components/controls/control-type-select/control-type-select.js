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
              scope.autoOpen = function(){
                console.log('here');
                var event;
                event = document.createEvent('MouseEvents');
                event.initMouseEvent('mousedown', true, true, window);
                console.log(elm.find('select')[0]);
                elm.find('select')[0].dispatchEvent(event);
              }
            }
        }
    }

    ControlTypeSelect.$inject = ['elementBindService'];
})();
