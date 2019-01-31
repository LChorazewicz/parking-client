define(["require", "exports", "../Util/Request"], function (require, exports, Request_1) {
    "use strict";
    exports.__esModule = true;
    var Waliduj = /** @class */ (function () {
        function Waliduj(domena) {
            this.url = domena;
            this.request = new Request_1.Request();
        }
        Waliduj.prototype.sprawdzCzyStrefaIstnieje = function (wojewodztwo, miasto, ulica) {
            return true;
        };
        Waliduj.prototype.sprawdzCzyKodDostepuJestPoprawny = function (kodDostepu, success, error) {
            Request_1.Request.pobierz(this.url + "/sprawdz/kod-sms/" + kodDostepu, "GET", "", success, error);
        };
        return Waliduj;
    }());
    exports.Waliduj = Waliduj;
});
