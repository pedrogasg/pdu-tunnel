(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.service('elementBindService', ElementBindService);
    function ElementBindService() {
      function bindElementFocus(element,scope){
        element.on('mousedown', function (e) {
            if (!element[0].firstElementChild.classList.contains('focused')) {
                e.preventDefault();
                var field = scope.field,
                    input = element.find(field.subtype);
                input[0].focus();
            }
        });
      }
      function bindElementToScope(element,scope){
        var input;
        scope.field.getInput = function(){
          if(!input){
            input = element.find(scope.field.subtype)[0];
          }
          return input;
        }
      }
      function initElementBindings(element,scope){
          bindElementToScope(element,scope);
          bindElementFocus(element,scope);
      }
        return {
            'bindElementFocus': bindElementFocus,
            'bindElementToScope':bindElementToScope,
            'initElementBindings': initElementBindings,
        }
    }

})();
