(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.service('dateParserService', DateParserService);
    var DATE_REGEXP = /^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/,
        DAY_ONLY_REGEXP = /^([0-2][0-9]|3[01])$/,
        ONE_DIGIT_DAY = /^[4-9]$/,
        MONTH_DATE_REGEXP = /^(0[1-9]|1[0-2])\/(\d{4})$/,
        MONTH_ONLY_REGEXP = /^(0[1-9]|1[0-2])$/,
        ONE_DIGIT_MONTH = /^[2-9]$/,
        DECEMBER = /^1[3-9]$/,
        YEAR_REGEXP = /^\d{4}$/,
        ERASE_REGEXP = /^([\d\/]+)\d\/$/,
        DAY = 0,
        MONTH = 1,
        YEAR = 2;
    function DateParserService() {

        function eraseSlash(value, callback) {
            var parts = ERASE_REGEXP.exec(value);
            if (parts) {
                callback(parts[1])
                return true;
            } else {
                return false;
            }
        }

        function isDate(value) {
            return DATE_REGEXP.test(value);
        }

        function isMonthDate(value) {
            return MONTH_DATE_REGEXP.test(value);
        }

        function getMonthTypeParts(value) {
            return MONTH_DATE_REGEXP.exec(value);
        }

        function getYear(value) {
            if (MONTH_DATE_REGEXP.test(value)) {
                var parts = MONTH_DATE_REGEXP.exec(value)
                return Number(parts[2]);
            }
            if (YEAR_REGEXP.test(value)) {
                return Number(value);
            }
        }

        function parseDate(value, callback) {
            if (~value.indexOf('//')) {
                callback(value.replace('//', '/'));
                return undefined;
            }
            var date = value.split('/');
            if (date[DAY]) {
                parseDay(date[DAY], function (val) {
                    date[DAY] = val;
                    });
            }
            if (date[MONTH]) {
                parseMonth(date[MONTH], function (val) {
                    date[MONTH] = val;
                });
            }
            
            var newValue = date.join('');
            console.log(date);
            callback(newValue);
            if(DATE_REGEXP.test(newValue)){
                return newValue;
            } else {
                return undefined;
            }
        }
        function parseDay(value,callback) {
            if (ONE_DIGIT_DAY.test(value)) {
                var day = parseInt(value);
                if (day < 1) day = 1;
                value = ("0" + day + "/").slice(-3);
                callback(value);
                return undefined;
            }
            if (DAY_ONLY_REGEXP.test(value)) {
                var day = parseInt(value);
                value = ("0" + day + "/").slice(-3);
                callback(value);
                return undefined;
            }
        }
        function parseMonth(value, callback) {
            if (~value.indexOf('//')) {
                callback(value.replace('//','/'));
                return undefined;
            }
          if (ONE_DIGIT_MONTH.test(value)) {
              var month = parseInt(value);
              if (month < 1) month = 1;
              value = ("0" + month + "/").slice(-3);
              callback(value);
              return undefined;
          }
          if (MONTH_ONLY_REGEXP.test(value)) {
              var month = parseInt(value);
              value = ("0" + month + "/").slice(-3);
              callback(value);
              return undefined;
          }
          if (DECEMBER.test(value)) {
              value = "12/";
              callback(value);
              return undefined;
          }
          return undefined;
        }
        return {
            'isMonthDate': isMonthDate,
            'parseMonth':parseMonth,
            'getMonthTypeParts': getMonthTypeParts,
            'getYear': getYear,
            'eraseSlash': eraseSlash,
            'isDate': isDate,
            'parseDate':parseDate
        }
    }

})();
