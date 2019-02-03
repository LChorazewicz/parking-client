define(["require", "exports", "../Util/Request"], function (require, exports, Request_1) {
    "use strict";
    exports.__esModule = true;
    var Pobierz = /** @class */ (function () {
        function Pobierz(domena) {
            this.url = domena;
            this.request = new Request_1.Request();
        }
        Pobierz.prototype.wojewodztwa = function (success, error, beforeSend) {
            return Request_1.Request.pobierz(this.url + '/adresy/pobierz/wojewodztwa', "GET", "", success, error, beforeSend);
        };
        Pobierz.prototype.miasta = function (idWojewodztwa, success, error, beforeSend) {
            return Request_1.Request.pobierz(this.url + '/adresy/pobierz/miasta/' + idWojewodztwa, "GET", "", success, error, beforeSend);
        };
        Pobierz.prototype.ulice = function (idMiasta, success, error, beforeSend) {
            return Request_1.Request.pobierz(this.url + '/adresy/pobierz/ulice/' + idMiasta, "GET", "", success, error, beforeSend);
        };
        Pobierz.prototype.pobierzIdStrefy = function (wojewodztwo, miasto, ulica) {
            return 12448;
        };
        Pobierz.prototype.sprawdzDostepnaOferte = function (strefa, daty) {
            var oferty = [
                {
                    id: 123,
                    odleglosc: " -- ",
                    lokalizacja: 'Ostrołęka, Sikorskiego 5',
                    iloscGodzin: 48,
                    cena: 37
                }
            ];
            var alternatywy = [
                {
                    id: 124,
                    odleglosc: "1.32",
                    lokalizacja: 'Ostrołęka, Sikorskiego 164',
                    iloscGodzin: 48,
                    cena: 38
                },
                {
                    id: 125,
                    odleglosc: "1.41",
                    lokalizacja: 'Ostrołęka, Sikorskiego 9',
                    iloscGodzin: 48,
                    cena: 34
                }
            ];
            return {
                oferta: true,
                alternatywa: true,
                oferty: oferty,
                alternatywy: alternatywy
            };
        };
        return Pobierz;
    }());
    exports.Pobierz = Pobierz;
});
