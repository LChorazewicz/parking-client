define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var OperacjeNaTablicach = /** @class */ (function () {
        function OperacjeNaTablicach() {
        }
        OperacjeNaTablicach.prototype.czyElementWystepujeWTablicy = function (element, tablica) {
            var znaleziony = false;
            for (var i = 0; i < tablica.length; i++) {
                if (tablica[i] === element) {
                    znaleziony = true;
                    break;
                }
            }
            return znaleziony;
        };
        OperacjeNaTablicach.prototype.czyTakieSameElementyDatyWystepujeWTablicy = function (element, tablica) {
            var znaleziony = false;
            for (var i = 0; i < tablica.length; i++) {
                if (tablica[i].getTime() === element.getTime()) {
                    znaleziony = true;
                    break;
                }
            }
            return znaleziony;
        };
        OperacjeNaTablicach.prototype.znajdzPozycjeElementuWTablicy = function (element, tablica) {
            var pozycja = -1;
            for (var i = 0; i < tablica.length; i++) {
                if (tablica[i] === element) {
                    pozycja = i;
                    break;
                }
            }
            return pozycja;
        };
        OperacjeNaTablicach.prototype.znajdzPozycjeElementuDatyWTablicy = function (element, tablica) {
            var pozycja = -1;
            for (var i = 0; i < tablica.length; i++) {
                if (tablica[i].getTime() === element.getTime()) {
                    pozycja = i;
                    break;
                }
            }
            return pozycja;
        };
        OperacjeNaTablicach.prototype.usunElementZTablicy = function (element, tablica) {
            return tablica.filter(function (e) { return e !== element; });
        };
        OperacjeNaTablicach.prototype.usunElementZTablicyPoPozycji = function (pozycja, tablica) {
            tablica.splice(pozycja, 1);
            return tablica;
        };
        return OperacjeNaTablicach;
    }());
    exports.OperacjeNaTablicach = OperacjeNaTablicach;
});
