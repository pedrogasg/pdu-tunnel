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
                    div, oldDiv = form.find('div'),
                    first;
                for (var key in fields) {
                    var field = fields[key];

                    div = angular.element(['<div control-type-', field.type, ' parent-key="tunnel.fields[\'', key, '\'].name" parent-tunnel="tunnel" field="tunnel.fields[\'', key, '\']"></div>'].join(''));
                    if(!first){
                      first = field;
                    }
                    field['element'] = div;
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
                        controller.first = first;
                    },
                    post: function (scope, iElem, iAttrs, controller) {

                    }
                }
            }
        };
    }
    function TunnelController($scope, $timeout) {
        var tunnel = this,
            _currentField = null,
            _moveCount = 0,
            _moveTimeout = null,
            _openTimeout = null
            _tunnelOffset = 210;
        tunnel.coClient = false;
        tunnel.element = document.querySelector('.tunnel-scroll');
        tunnel.submitInput = document.querySelector('input[type=submit]');
        tunnel.element.addEventListener('wheel', function (e) {
            if (_currentField) {
                var delta = Math.max(-1, Math.min(1, e.wheelDelta));
                if (_moveCount == 0) {
                    if (delta < 0) {
                        tunnel.nextInput();
                    } else {
                        tunnel.previousInput();
                    }
                }

                if (_moveCount == 4) {
                    _moveCount = 1;
                    if (delta < 0) {
                        tunnel.nextInput();
                    } else {
                        tunnel.previousInput();
                    }
                } else {
                    _moveCount += 1;
                }
                clearTimeout(_moveTimeout);
                _moveTimeout = setTimeout(function () {
                    _moveCount = 0;
                },500);
            }

        },false);
        tunnel.submit = function () {
          if(tunnel.form.$invalid){
            var invalid = tunnel.element.firstElementChild.querySelector('select.ng-invalid,input.ng-invalid');
            invalid.focus();
          }

        };
        tunnel.setOpacity = function(field){
          var currentControl = field.element[0].querySelector('.control');
          var controls = tunnel.element.querySelectorAll('.control');
          var index = Array.prototype.indexOf.call(controls,currentControl);
          currentControl.style.opacity = '1';
          if(index > 0){
            controls[index - 1].style.opacity = '0.8';
          }
          var length = Math.min(5,controls.length-index);
          for(var i = 1,j = 8;i < length;i++,j-=2){
            controls[index + i].style.opacity = '0.'+j;
          }
        }
        tunnel.setCurrentField = function (field) {
            _currentField = field;
            var offset = 0;
            if(field.next){
              offset = field.prev ? -(field.next.element[0].offsetTop-_tunnelOffset) : 0;
            }else{
              offset = -(tunnel.submitInput.offsetTop-_tunnelOffset);
            }
            tunnel.element.style.top = offset + 'px';
            tunnel.fieldLabel = field.label;
            tunnel.fieldGroup = field.group;
            tunnel.setOpacity(field);
        };

        tunnel.fieldOnFocus = function(field){
            if(field.onFocus){
              _openTimeout = $timeout(function () {
                field.onFocus(field.getInput());
              },300);
            }
          };
        tunnel.goToNextInput = function (field, reverse) {
            if (field.hasCoClient) {
                tunnel.coClient = Boolean(~field.hasCoClient.indexOf(field.value)) ;
            }
            if(!reverse && !field.next){
              tunnel.submitInput.focus();
              return;
            }
            $timeout.cancel(_openTimeout);
            $timeout(function () {
                do {
                    field = reverse ? field.prev : field.next;
                } while (field && !field.isVisible(tunnel))
                field.getInput().focus();
                return field;
            }, 10).then(tunnel.fieldOnFocus);
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
            if (_currentField && _currentField.next) {
                tunnel.goToNextInput(_currentField);
            }
        };
        tunnel.previousInput = function () {
            if (_currentField && _currentField.prev) {
                tunnel.goToNextInput(_currentField, true);
            }
        }
        tunnel.isCurrentField = function (field) {
            return Boolean(_currentField) && _currentField.name == field.name;
        }

        tunnel.init = function () {
            tunnel.first.getInput().focus();
            var optin = angular.element('<label class="optin"><input type="checkbox" checked="checked"/> J\'accepte de recevoir les offres commerciales de Prêt d\'Union</label>');
            tunnel.first.element[0].querySelector('.input').appendChild(optin[0]);
        }
        $timeout(tunnel.init, 200);
    }
    Tunnel.$inject = ['FieldsService'];
    TunnelController.$inject = ['$scope', '$timeout'];
})();
