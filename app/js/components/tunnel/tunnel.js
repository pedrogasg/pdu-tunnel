(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('tunnel', Tunnel);
    function Tunnel(FieldsService) {
        return {
            restrict: 'A',
            templateUrl: '/app/js/components/tunnel/tunnel.html',
            controller: TunnelController,
            controllerAs: 'tunnel',
            transclude: true,
            compile: function compile(tElement, tAttrs, transclude) {
                var fields = FieldsService.getFields(),
                    form = tElement.find('form'),
                    div, oldDiv;
                for (var key in fields) {
                    var field = fields[key];
                    div = angular.element(['<div control-type-', field.type, ' parent-key="tunnel.fields[\'', key, '\'].name" parent-tunnel="tunnel" field="tunnel.fields[\'', key, '\']"></div>'].join(''));
                    if (oldDiv) {
                        oldDiv.after(div);
                    } else {
                        form.prepend(div);
                    }
                    oldDiv = div;
                }
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        controller.fields = fields;
                    },
                    post: function (scope, iElem, iAttrs) {
                    }
                }
            }
        };
    }
    function TunnelController($scope, $filter) {
        var tunnel = this,
            currentField = null;
        tunnel.coClient = false;
        tunnel.element = document.querySelector('.tunnel-scroll');
        tunnel.submit = function () {
            console.log(tunnel);
        };
        tunnel.setCurrentField = function (field) {
            currentField = field;
            tunnel.element.style.top = -field.element[0].offsetTop + 'px';
            tunnel.fieldLabel = field.label;
            tunnel.fieldGroup = field.group;
        };
        tunnel.validInput = function (field) {
            if (field.name == "Etape1_Client_SituationFamilialeId") {
                tunnel.coClient = field.value == 2 || field.value == 4;
            }
        };
        tunnel.goToNextInput = function (field, reverse) {
            setTimeout(function () {
                do {
                    field = reverse ? field.prev : field.next;
                } while (field && !field.isVisible(tunnel))
                var input = field.element.find(field.subtype);
                input[0].focus();
            }, 100);
        }
        tunnel.filter = function (currentKey, list) {
            var fields = tunnel.fields;
            for (var key in fields) {
                var field = fields[key];
                if (field.filters && currentKey in field.filters) {
                    var filter = field.filters[currentKey],
                        filterObj = {};
                    filterObj[filter] = field.getFilter(filter);
                    list = $filter('filter')(list, filterObj);
                }
            }
            return list;
        };
        tunnel.nextInput = function () {
            if (currentField && currentField.next) {
                tunnel.goToNextInput(currentField);
            }
        };
        tunnel.previusInput = function () {
            if (currentField && currentField.prev) {
                tunnel.goToNextInput(currentField, true);
            }
        }
    }
    Tunnel.$inject = ['FieldsService'];
    TunnelController.$inject = ['$scope', '$filter'];
})();