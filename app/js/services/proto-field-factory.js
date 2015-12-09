(function () {
    var TunnelPhantom = angular.module('TunnelPhantom'),
        _protos = {};
    TunnelPhantom.factory('ProtoFieldFactory', ProtoFieldFactory);
    var _basicBinding = {
        'values': function (field, bind) {
            if (bind.values) {
                var values = bind.values
                return values && (~values.indexOf(field.value) || (values[0] == '*' && field.value != '') && bind.hidden != field.value);
            } else {
                return false;
            }
        },
        'regexp': function (field, bind) {
            if (bind.regexp) {
                var regexp = new RegExp(bind.regexp);
                return regexp.test(field.value);
            } else {
                return false;
            }
        },
        'superior': function (field, bind) {
            if (bind.superior) {
                return bind.superior < Number(field.value);
            } else {
                return false;
            }
        }
    },
    _basic = {
        'bindHooks': {
            'enumerable': false,
            'writable': false,
            'configurable': false,
            'value': _basicBinding
        },
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
                        var field = $tunnel.fields[bind.name];
                        for (var key in bind) {
                            if (key != 'name' && $this.bindHooks[key] && $this.bindHooks[key](field, bind)) {
                                visible = true;
                                break;
                            }
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
        _select = angular.merge({
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
            },
            'onFocus': {
                'enumerable': false,
                'writable': false,
                'configurable': false,
                'value': function (input) {
                    /*var event;
                    event = document.createEvent('MouseEvents');
                    event.initMouseEvent('mousedown', true, true, window);
                    input.dispatchEvent(event);*/
                }
            },
            'changeValuesKey': {
                'enumerable': false,
                'writable': false,
                'configurable': false,
                'value': function (value) {
                    var $this = this;
                    if ($this.keyForValuesRoot && value) {
                        $this.__proto__.keyForValues = $this.keyForValuesRoot + value;
                    }
                }
            }
        }, _basic);
    _protos['text'] = _basic;
    _protos['number'] = _basic;
    _protos['month'] = _basic;
    _protos['select'] = _select;
    _protos['money'] = _basic;
    _protos['yesno'] = _basic;
    _protos['date'] = _basic;
    _protos['year'] = _basic;
    _protos['phone'] = _basic;
    _protos['zipcode'] = _basic;
    _protos['insurance'] = _basic;
    function _getPrototype(type, $log) {
        if (type in _protos) {
            return _protos[type];
        } else {
            $log.error(['The ', type, ' type not exist yet !'].join(''))
        }
    }
    function ProtoFieldFactory($log) {
        return function (field, type) {
            return Object.create(field, _getPrototype(type, $log));
        }
    }
    ProtoFieldFactory.$inject = ['$log'];
})();
