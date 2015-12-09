(function () {
    var TunnelPhantom = angular.module('TunnelPhantom')
    TunnelPhantom.provider('ResourceService', ResourceService);

    function ResourceService() {
        var _apiUrl;

        this.setApiUrl = function (url) {
            _apiUrl = url;
        };

        this.$get = ['$http','$cacheFactory', function ($http,  $cacheFactory) {
            var valuesCache = $cacheFactory('value');

            function keyTransform(x, index) {

                if (typeof x == 'string') {
                    return {
                        'id': x,
                        'label':x
                    }
                }
                return {
                    'id': x.Id,
                    'label': x.Label || x.Libelle || x.Name,
                    'filtre': x.IdSecteur
                }
            }

            function getValues(key) {
                return $http.get(_apiUrl + key, {
                    'cache':valuesCache
                }).then(function (response) {
                    var data = response.data.map(keyTransform);
                    return data;
                });
            }
            return {
                'getValues':getValues
            };
        }];
    }
})();