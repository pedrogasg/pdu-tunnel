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
                    div, oldDiv = form.find('div');
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
                    post: function (scope, iElem, iAttrs, controller) {
                        
                    }
                }
            }
        };
    }
    function TunnelController($scope, $timeout) {
        var tunnel = this,
            currentField = null,
            moveCount = 0,
            moveTimeout = null;
        tunnel.coClient = false;
        tunnel.element = document.querySelector('.tunnel-scroll');
        tunnel.element.addEventListener('mousewheel', function (e) {
            if (currentField) {
                var delta = Math.max(-1, Math.min(1, e.wheelDelta));
                if (moveCount == 0) {
                    if (delta < 0) {
                        tunnel.nextInput();
                    } else {
                        tunnel.previusInput();
                    }
                }

                if (moveCount == 4) {
                    moveCount = 1;
                    if (delta < 0) {
                        tunnel.nextInput();
                    } else {
                        tunnel.previusInput();
                    }
                } else {
                    moveCount += 1;
                }
                clearTimeout(moveTimeout);
                moveTimeout = setTimeout(function () {
                    moveCount = 0;
                },500);
            }

        },false);
        tunnel.submit = function () {
            console.log(tunnel);
        };
        tunnel.setCurrentField = function (field) {
            currentField = field;
            var offset = field.prev ? -(field.next.element[0].offsetTop-210) : 0;
            tunnel.element.style.top = offset + 'px';
            tunnel.fieldLabel = field.label;
            tunnel.fieldGroup = field.group;
        };
        tunnel.validInput = function (field) {
            if (field.name == "Etape1_Client_SituationFamilialeId") {
                tunnel.coClient = field.value == 2 || field.value == 4;
            }
        };
        tunnel.goToNextInput = function (field, reverse) {
            if (field.name == "Etape1_Client_SituationFamilialeId") {
                tunnel.coClient = field.value == 2 || field.value == 4;
            }
            setTimeout(function () {
                do {
                    field = reverse ? field.prev : field.next;
                } while (field && !field.isVisible(tunnel))
                var input = field.element.find(field.subtype);
                input[0].focus();
            }, 10);
        }
        tunnel.filter = function (currentKey, values) {
            var fields = tunnel.fields,
                list = values.map(function (x) {
                    return x;
                });
            for (var key in fields) {
                var field = fields[key];
                if (field.filters && currentKey in field.filters) {
                    var filter = field.filters[currentKey],
                        filterVal = field.getFilter(filter);
                    if (filterVal) {
                        list = list.filter(function (x) {
                            return x[filter] == filterVal;
                        });
                    }
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
        tunnel.isCurrentField = function (field) {
            return Boolean(currentField) && currentField.name == field.name;
        }

        tunnel.init = function () {
            console.log(tunnel.fields['Etape1_Client_SituationFamilialeId'].element.find('select')[0].focus());
        }
        $timeout(tunnel.init, 200);
    }
    Tunnel.$inject = ['FieldsService'];
    TunnelController.$inject = ['$scope', '$timeout'];
})();