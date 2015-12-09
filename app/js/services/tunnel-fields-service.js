(function () {
    var TunnelPhantom = angular.module('TunnelPhantom')
    TunnelPhantom.provider('TunnelFieldsService', TunnelFieldsService);

    function TunnelFieldsService() {
        var _templateUrl,
            _fieldsUrl,
            _fields,
            _objectFields = {};

        function _loadFields() {
            var initInjector = angular.injector(['ng']);
            var $http = initInjector.get('$http');
            return $http.get(_fieldsUrl).then(function (request) {
                _fields = request.data;
                return _fields;
            });
        }

        this.setfieldsUrl = function (url) {
            _fieldsUrl = url;
        }
        this.setTemplateUrl = function (url) {
            _templateUrl = url;
        }
        this.$get = ['ProtoFieldFactory', '$q', '$log', '$cacheFactory', function (ProtoFieldFactory, $q, $log, $cacheFactory) {

            function _buildObjects(fields) {
                var templateBuffer = [], prev, name,fieldString;
                for (var i = 0, field; field = fields[i]; i++) {

                    name = field.name;
                    fieldString = 'tunnel.fields[\'' + name + '\']';

                    templateBuffer.push(['<div control-type-', field.type, ' parent-key="',fieldString,'.name" parent-tunnel="tunnel" field="',fieldString,'"></div>'].join(''));
                    _objectFields[name] = ProtoFieldFactory(field, field.type);
                    if (prev) {
                        _objectFields[name]['prev'] = prev;
                        prev['next'] = _objectFields[name];
                    } 
                    prev = _objectFields[name];
                }
                return templateBuffer.join('');
            }

            function getFields() {
                if (!_fields) {
                    $log.error('The Fields are missing');
                }
                return _fields;
            }

            function getObjectFields(){
                if (Object.getOwnPropertyNames(_objectFields).length === 0) {
                    $log.error('The Fields are missing');
                }
                return _objectFields;
            }

            function getFirstObject() {
                if (!_fields || !_objectFields) {
                    $log.error('The Fields are missing');
                }
                return _objectFields[_fields[0].name];
            }

            function responseInterceptor(response) {
                var deferred = $q.defer();
                if (response.config.url == _templateUrl) {
                    _loadFields().then(function (fields) {
                        var data = response.data
                        response.data = data.replace('<!--replace-->', _buildObjects(fields))
                        deferred.resolve(response);
                    });
                } else {
                    deferred.resolve(response);
                }
                return deferred.promise;
            }

            function requestInterceptor(config) {
                var deferred = $q.defer();
                deferred.resolve(config);
                return deferred.promise;
            }

            var interceptor = {
                'response': responseInterceptor,
                'request': requestInterceptor,
                'getFields': getFields,
                'getObjectFields': getObjectFields,
                'getFirstObject': getFirstObject
            };
            return interceptor;
        }];
    }
})();
