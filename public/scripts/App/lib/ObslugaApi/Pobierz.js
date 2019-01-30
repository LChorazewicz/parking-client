define(["require", "exports", "../Util/Request"], function (require, exports, Request_1) {
    "use strict";
    exports.__esModule = true;
    var Pobierz = /** @class */ (function () {
        function Pobierz(domena) {
            this.url = domena;
            this.request = new Request_1.Request();
        }
        Pobierz.prototype.wojewodztwa = function (success, error) {
            return Request_1.Request.pobierz(this.url + '/adresy/pobierz/wojewodztwa', "GET", "", success, error);
        };
        Pobierz.prototype.miasta = function (idWojewodztwa, success, error) {
            return Request_1.Request.pobierz(this.url + '/adresy/pobierz/miasta/' + idWojewodztwa, "GET", "", success, error);
        };
        Pobierz.prototype.ulice = function (idMiasta, success, error) {
            return Request_1.Request.pobierz(this.url + '/adresy/pobierz/ulice/' + idMiasta, "GET", "", success, error);
        };
        Pobierz.prototype.pobierzIdStrefy = function (wojewodztwo, miasto, ulica) {
            return 12448;
        };
        Pobierz.prototype.sprawdzDostepnoscMiejscWStrefie = function (strefa, daty) {
            return {
                dostepnoscWybranychDat: true,
                dostepnoscMiejsc: true,
                alternatywa: true,
                daty: {
                    "18-11-2018": {
                        wolnychMiejsc: 145,
                        obserwujacych: 44,
                        godziny: [
                            [0, 1],
                            [3, 8],
                            [9, 11],
                            [15, 16],
                            [17, 19],
                            [20, 21],
                            [22, 23],
                            [23, 0]
                        ]
                    },
                    "19-11-2018": {
                        wolnychMiejsc: 88,
                        obserwujacych: 21,
                        godziny: [
                            [0, 3],
                            [15, 16],
                            [17, 19],
                            [20, 21],
                            [23, 0]
                        ]
                    },
                    "20-11-2018": {
                        wolnychMiejsc: 14,
                        obserwujacych: 4,
                        godziny: [
                            [0, 11],
                            [15, 16],
                            [20, 21],
                            [23, 0]
                        ]
                    },
                    "21-11-2018": {
                        wolnychMiejsc: 0,
                        obserwujacych: 4,
                        godziny: []
                    }
                }
            };
        };
        return Pobierz;
    }());
    exports.Pobierz = Pobierz;
});
