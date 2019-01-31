define(["require", "exports", "./Pobierz", "./Waliduj"], function (require, exports, Pobierz_1, Waliduj_1) {
    "use strict";
    exports.__esModule = true;
    var ObslugaApi = /** @class */ (function () {
        function ObslugaApi() {
        }
        ObslugaApi.prototype.pobierzObiektPobierz = function (domena) {
            return new Pobierz_1.Pobierz(domena);
        };
        ObslugaApi.prototype.pobierzObiektWaliduj = function (domena) {
            return new Waliduj_1.Waliduj(domena);
        };
        ObslugaApi.prototype.pobierzObiektAktualizuj = function () {
        };
        return ObslugaApi;
    }());
    exports.ObslugaApi = ObslugaApi;
});
