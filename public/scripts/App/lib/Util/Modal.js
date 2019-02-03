define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Modal = /** @class */ (function () {
        function Modal() {
        }
        Modal.prototype.pokazOknoZOfertami = function (oferta) {
            // @ts-ignore
            $("#modal-sprawdz-dostepnosc-ofert").modal();
            var kontener = $("#modal-sprawdz-dostepnosc-ofert .container");
            kontener.empty();
            var wiadomosc;
            if (oferta.oferta) {
                wiadomosc = "Znaleźliśmy ofertę w wybranej przez Ciebie lokalizacji!";
            }
            else {
                wiadomosc = "Niestety nie znaleźliśmy oferty w wybranej przez Ciebie lokalizacji :( ";
                if (oferta.alternatywa) {
                    wiadomosc += " ale znaleźliśmy w innej!";
                }
            }
            var divRow = this.dodajDiv("row");
            kontener.append(divRow);
            var div = this.dodajDiv("col-sm-12", "margin: 13px 0;");
            divRow.append(div);
            var paragraf = this.dodajParagraf(wiadomosc, "text-center");
            div.append(paragraf);
            if (oferta.oferta) {
                var kolumny = new Array();
                kolumny.push("Odległość");
                kolumny.push("Lokalizacja");
                kolumny.push("Czas pobytu");
                kolumny.push("Cena za cały pobyt");
                var kolekcja = new Array();
                for (var _i = 0, _a = oferta.oferty; _i < _a.length; _i++) {
                    var DTOOferta = _a[_i];
                    var tablica = new Array();
                    tablica.push(DTOOferta.id.toString());
                    if (DTOOferta.odleglosc == " -- ") {
                        tablica.push(DTOOferta.odleglosc);
                    }
                    else {
                        tablica.push(DTOOferta.odleglosc + "km");
                    }
                    tablica.push(DTOOferta.lokalizacja);
                    tablica.push(DTOOferta.iloscGodzin.toString() + "h");
                    tablica.push(DTOOferta.cena.toString() + "zł");
                    kolekcja.push(tablica);
                }
                kontener.append(this.dodajTabelke(kolumny, kolekcja));
                if (oferta.alternatywa) {
                    var wiadomosc_1 = "Cenimy to, że wybrałeś właśnie nas, dlatego przygotowaliślimy dla Ciebie także specjalną ofertę!";
                    var divRow_1 = this.dodajDiv("row");
                    kontener.append(divRow_1);
                    var div_1 = this.dodajDiv("col-sm-12", "margin-bottom: 13px;");
                    divRow_1.append(div_1);
                    var paragraf_1 = this.dodajParagraf(wiadomosc_1, "text-center");
                    div_1.append(paragraf_1);
                    var kolumny_1 = new Array();
                    kolumny_1.push("Odległość");
                    kolumny_1.push("Lokalizacja");
                    kolumny_1.push("Czas pobytu");
                    kolumny_1.push("Cena za cały pobyt");
                    var kolekcja_1 = new Array();
                    for (var _b = 0, _c = oferta.alternatywy; _b < _c.length; _b++) {
                        var DTOOferta = _c[_b];
                        var tablica = new Array();
                        tablica.push(DTOOferta.id.toString());
                        if (DTOOferta.odleglosc == " -- ") {
                            tablica.push(DTOOferta.odleglosc);
                        }
                        else {
                            tablica.push(DTOOferta.odleglosc + "km");
                        }
                        tablica.push(DTOOferta.lokalizacja);
                        tablica.push(DTOOferta.iloscGodzin.toString() + "h");
                        tablica.push(DTOOferta.cena.toString() + "zł");
                        kolekcja_1.push(tablica);
                    }
                    kontener.append(this.dodajTabelke(kolumny_1, kolekcja_1));
                }
            }
            console.log(oferta);
        };
        Modal.prototype.dodajTabelke = function (kolumny, trescKolumn) {
            var tabelka = this.dodajElement('table', 'table table-striped table-bordered');
            var thead = this.dodajElement('thead');
            var tr = this.dodajElement('tr');
            thead.append(tr);
            tabelka.append(thead);
            for (var _i = 0, kolumny_2 = kolumny; _i < kolumny_2.length; _i++) {
                var kolumna = kolumny_2[_i];
                var th = this.dodajElement('th');
                th.innerText = kolumna;
                tr.append(th);
            }
            var tbody = this.dodajElement('tbody');
            for (var _a = 0, trescKolumn_1 = trescKolumn; _a < trescKolumn_1.length; _a++) {
                var kolekcja = trescKolumn_1[_a];
                var tr_1 = this.dodajElement('tr', "clickable-row");
                for (var i = 0; i <= kolekcja.length - 1; i++) {
                    if (i == 0) {
                        tr_1.setAttribute("data-id", kolekcja[i].toString());
                        continue;
                    }
                    var td = this.dodajElement('td');
                    td.innerText = kolekcja[i];
                    tr_1.append(td);
                }
                tbody.append(tr_1);
            }
            tabelka.append(tbody);
            return tabelka;
        };
        Modal.prototype.dodajElement = function (nazwaElementu, klasa) {
            var element = document.createElement(nazwaElementu);
            if (klasa != null) {
                element.setAttribute("class", klasa);
            }
            return element;
        };
        Modal.prototype.dodajParagraf = function (wiadomosc, klasa) {
            var row = document.createElement('div');
            row.innerText = wiadomosc;
            if (klasa != null) {
                row.setAttribute("class", klasa);
            }
            return row;
        };
        Modal.prototype.dodajDiv = function (klasa, style) {
            var element = document.createElement('div');
            if (klasa != null) {
                element.setAttribute("class", klasa);
            }
            if (style != null) {
                element.setAttribute("style", style);
            }
            return element;
        };
        Modal.prototype.pokazBladUzytkownikowi = function (blad) {
            var kontener = $("#modal-blad .container");
            kontener.empty();
            var divRow = this.dodajDiv("row");
            kontener.append(divRow);
            var div = this.dodajDiv("col-sm-12", "margin: 13px 0;");
            divRow.append(div);
            var paragraf = this.dodajParagraf(blad, "text-center");
            div.append(paragraf);
            // @ts-ignore
            $("#modal-blad").modal();
        };
        return Modal;
    }());
    exports.Modal = Modal;
});
