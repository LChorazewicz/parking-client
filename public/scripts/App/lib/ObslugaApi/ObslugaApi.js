define(["require", "exports", "./Pobierz", "./Waliduj"], function (require, exports, Pobierz_1, Waliduj_1) {
    "use strict";
    exports.__esModule = true;
    var ObslugaApi = /** @class */ (function () {
        function ObslugaApi() {
        }
        ObslugaApi.prototype.pobierzObiektPobierz = function () {
            return new Pobierz_1.Pobierz();
        };
        ObslugaApi.prototype.pobierzObiektWaliduj = function () {
            return new Waliduj_1.Waliduj();
        };
        ObslugaApi.prototype.pobierzObiektAktualizuj = function () {
        };
        return ObslugaApi;
    }());
    exports.ObslugaApi = ObslugaApi;
});
