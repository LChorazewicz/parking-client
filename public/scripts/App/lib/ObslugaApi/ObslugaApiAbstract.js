"use strict";
exports.__esModule = true;
var ObslugaApiAbstract = /** @class */ (function () {
    function ObslugaApiAbstract() {
    }
    ObslugaApiAbstract.pobierzKlucz = function (data_od, data_do, czas_od, czas_do, wojewodztwo, miasto, ulica) {
        return "95d4-9r5r-4dgt-gh5g-gfh6-hsd6";
    };
    ObslugaApiAbstract.prototype.wykonajZapytanie = function (metoda, adres, dane) {
        if (dane === void 0) { dane = {}; }
        $.ajax({
            method: metoda,
            url: adres,
            contentType: "application/json",
            dataType: "json",
            data: dane,
            async: true
        })
            .done(function (odpowiedz, kod) {
            console.log("skonczylem", odpowiedz);
            return {
                odpowiedz: odpowiedz.responseText,
                status: odpowiedz.status
            };
        })
            .fail(function (odpowiedz, kod) {
            console.log("blad", odpowiedz);
            return {
                odpowiedz: odpowiedz.responseText,
                status: odpowiedz.status
            };
        });
    };
    return ObslugaApiAbstract;
}());
exports.ObslugaApiAbstract = ObslugaApiAbstract;
