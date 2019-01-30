define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Walidacja = /** @class */ (function () {
        function Walidacja() {
        }
        Walidacja.prototype.twoDates = function (firstDate, secondDate) {
            if (isNaN(firstDate.getTime())) {
                return false;
            }
            if (isNaN(secondDate.getTime())) {
                return false;
            }
            var today = new Date;
            if (firstDate.getTime() < today.getTime()) {
                console.log("data_od nie może być wcześniejsza niż dzisiejsza!");
                return false;
            }
            if (secondDate.getTime() < secondDate.getTime()) {
                console.log("data_do nie może być wcześniejsza niż dzisiejsza!");
                return false;
            }
            return true;
        };
        Walidacja.prototype.naturalNumber = function (value) {
            if (value === null) {
                return false;
            }
            return (value >= 1);
        };
        Walidacja.prototype.isChecked = function (obj) {
            return obj.checked;
        };
        Walidacja.prototype.isEmpty = function (value) {
            if (value === null) {
                return true;
            }
            if (value.length <= 0) {
                return true;
            }
            return false;
        };
        Walidacja.prototype.walidujDaty = function (dni) {
            return dni.length > 0;
        };
        return Walidacja;
    }());
    exports.Walidacja = Walidacja;
});
