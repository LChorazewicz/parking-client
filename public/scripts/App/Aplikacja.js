define(["require", "exports", "./Krok", "./EventDispatcher"], function (require, exports, krok, EventDispatcher_1) {
    "use strict";
    exports.__esModule = true;
    var Aplikacja = /** @class */ (function () {
        function Aplikacja() {
            this.krok = new krok.Krok();
        }
        Aplikacja.prototype.uruchom = function (numerKroku, stronaBledu) {
            this.krok.uruchom(numerKroku, stronaBledu); //ładuje dane do selectow i przygotowuje aplikacje;
            (new EventDispatcher_1.EventDispatcher()).uruchom(numerKroku, stronaBledu); //operuje na eventach, waliduje
        };
        return Aplikacja;
    }());
    exports.Aplikacja = Aplikacja;
});
