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
        var tunnel = this;
        tunnel.coClient = false;
        tunnel.submit = function () {
            console.log(tunnel);
        };
        tunnel.setCurrentField = function (field) {
            tunnel.fieldLabel = field.label;
            tunnel.fieldGroup = field.group;
        };
        tunnel.validInput = function (field) {
            if (field.name == "Etape1_Client_SituationFamilialeId") {
                tunnel.coClient = field.value == 2 || field.value == 4;
            }
        };
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
    }
    Tunnel.$inject = ['FieldsService'];
    TunnelController.$inject = ['$scope', '$filter'];
})();