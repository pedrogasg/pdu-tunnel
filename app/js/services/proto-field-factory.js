(function () {
    var TunnelPhantom = angular.module('TunnelPhantom'),
        _protos = {};
    TunnelPhantom.factory('ProtoFieldFactory', ProtoFieldFactory);
    var _basic = {
        'isVisible': {
            'enumerable': false,
            'writable': false,
            'configurable': false,
            'value': function ($tunnel) {
                var $this = this,
                    visible = !$this.hidden,
                    binds = $this.binds;
                if (binds) {
                    for (var i = 0, bind; bind = binds[i]; i++) {
                        var field = $tunnel.fields[bind.name],
                            values = bind.values,
                            unvalues = bind.unvalues,
                            superior = bind.superior,
                            regexp = bind.regexp ? new RegExp(bind.regexp) : null;
                        if (values && (~values.indexOf(field.value) || (values[0] == '*' && field.value != ''))) {
                            visible = true;
                        }
                        if (regexp && regexp.test(field.value)) {
                            visible = true;
                        }
                        if ('superior' in bind && superior < Number(field.value)) {
                            visible = true;
                        }
                    }
                }
                if (visible && $this.coClient) {
                    visible = $tunnel.coClient;
                }
                if (!visible) {
                    $this.value = undefined;
                }
                return visible;
            }
        },
        'isRequire': {
            'enumerable': false,
            'writable': false,
            'configurable': false,
            'value': function ($tunnel) {
                var $this = this,
                    require = $this.isVisible($tunnel);
                if ($this.skip) {
                    require = false;
                }
                return require;
            }
        },
        'getFilter': {
            'enumerable': false,
            'writable': false,
            'configurable': false,
            'value': function (filter) {
                return this.value;
            }
        }
    },
    _select = angular.extend({
        'oddValue': {
            'enumerable': false,
            'writable': false,
            'configurable': false,
            'value': function (filter) {
                var $this = this,
                    returnValue = false,
                    oddValues = $this.oddValues;
                if (oddValues) {
                    returnValue = Boolean(~oddValues.indexOf($this.value));
                }
                return returnValue;
            }
        }
    },_basic);
    _protos['text'] =  _basic;
    _protos['number'] = _basic;
    _protos['month'] = _basic;
    _protos['select'] = _select;
    _protos['money'] = _basic;
    _protos['yesno'] = _basic;
    _protos['date'] = _basic;
    _protos['year'] = _basic;
    _protos['phone'] = _basic;
    function _getPrototype(type,$log) {
        if (type in _protos) {
            return _protos[type];
        } else {
            $log.error(['The ',type,' type not exist yet !'].join(''))
        }
    }
    function ProtoFieldFactory($log) {
        return function (field, type) {
            return Object.create(field, _getPrototype(type,$log));
        }
    }
    ProtoFieldFactory.$inject = ['$log'];
})();
