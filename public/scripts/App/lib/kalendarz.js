define(["require", "exports", "../helper/Miesiac"], function (require, exports, Miesiac_1) {
    "use strict";
    exports.__esModule = true;
    var Kalendarz = /** @class */ (function () {
        function Kalendarz(element) {
            this.input = element;
            Kalendarz.dniTygodnia = ['nie', 'pon', 'wto', 'sro', 'czw', 'pia', 'sob'];
            Kalendarz.dniTygodniaAng = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        }
        Kalendarz.prototype.uruchom = function (data) {
            this.data = data;
            var input = $("#" + this.input.id), rodzic = input.parent();
            this.element = {
                'kalendarz': this.stworzDziecko("kalendarz"),
                'naglowek': this.stworzDziecko("naglowek"),
                'wstecz': this.stworzDziecko("wstecz"),
                'nazwa_miesiaca': this.stworzDziecko("nazwa_miesiaca"),
                'do_przodu': this.stworzDziecko("do_przodu"),
                'legenda': this.stworzDziecko("legenda"),
                'cialo': this.stworzDziecko("cialo"),
                'input': input,
            };
            var poprzedniMiesiac = new Miesiac_1.Miesiac(data, -1);
            var obecnyMiesiac = new Miesiac_1.Miesiac(data, 0);
            var nastepnyMiesiac = new Miesiac_1.Miesiac(data, 1);
            poprzedniMiesiac.ustawIndexStartowy(1);
            rodzic.append(this.element['kalendarz']);
            this.element['naglowek'].appendChild(this.element['wstecz']);
            this.element['naglowek'].appendChild(this.element['nazwa_miesiaca']);
            this.element['naglowek'].appendChild(this.element['do_przodu']);
            this.element['kalendarz'].appendChild(this.element['naglowek']);
            this.stworzLegende();
            this.element['kalendarz'].appendChild(this.element['cialo']);
            this.element['cialo'].appendChild(this.element['legenda']);
            this.element['nazwa_miesiaca'].innerHTML = obecnyMiesiac.pobierzNazweMiesiaca() + " " + obecnyMiesiac.pobierzRok().toString();
            var zaczytalemPierwszyTydzien = false, odKtoregoIndexuZaczac = obecnyMiesiac.pobierzIndexStartowy(), dniPoprzedniegoMiesiaca = poprzedniMiesiac.pobierzTabliceIloscDniMiesiaca(odKtoregoIndexuZaczac);
            obecnyMiesiac.ustawIndexStartowy(dniPoprzedniegoMiesiaca.length);
            /**
             * i - nie zmienia swojego stanu
             * j - zmienia swój stan na 0 od nowego miesiąca
             * k - to wartość od którego index-u wstawiać tekst w pierwszym tygodniu
             */
            for (var i = 1, j = 1, k = odKtoregoIndexuZaczac; i <= Kalendarz.ileDniWWnierszu; i++, j++) {
                var komorka = document.createElement("div");
                if (k >= i && !zaczytalemPierwszyTydzien) { //wypełnia dniWybrane z poprzedniego miesiaca
                    komorka.setAttribute("class", "komorka komorka-" + i + " poprzedni_miesiac");
                    // komorka.setAttribute("id", poprzedniMiesiac.pobierzRokMiesiac() + "-" +
                    //     ((dniPoprzedniegoMiesiaca[i - 1] < 10) ? "0" + dniPoprzedniegoMiesiaca[i - 1] : dniPoprzedniegoMiesiaca[i - 1]) + "T23:00:00.000Z");
                    komorka.setAttribute("id", this.okreslId(poprzedniMiesiac, dniPoprzedniegoMiesiaca[i - 1]));
                    komorka.innerHTML = dniPoprzedniegoMiesiaca[i - 1].toString();
                    this.element['cialo'].appendChild(komorka);
                    continue;
                }
                if (!zaczytalemPierwszyTydzien) {
                    zaczytalemPierwszyTydzien = true;
                    i = j = 0;
                    k = -1;
                    continue;
                }
                if (i >= Kalendarz.ileDniWWnierszu - odKtoregoIndexuZaczac + 1) {
                    break;
                }
                if (j > obecnyMiesiac.pobierzIloscDni()) {
                    j = 1; //przejscie do kolejnego miesiaca
                }
                if (i <= obecnyMiesiac.pobierzIloscDni()) {
                    komorka.setAttribute("class", "komorka komorka-" + i);
                    // komorka.setAttribute("id", obecnyMiesiac.pobierzRokMiesiac() + "-" + ((i < 10) ? "0" + i : i) + "T23:00:00.000Z");
                    komorka.setAttribute("id", this.okreslId(obecnyMiesiac, i));
                }
                else {
                    komorka.setAttribute("class", "komorka komorka-" + i + " nastepny_miesiac");
                    // komorka.setAttribute("id", nastepnyMiesiac.pobierzRokMiesiac() + "-" + ((j < 10) ? "0" + j : j) + "T23:00:00.000Z");
                    komorka.setAttribute("id", this.okreslId(nastepnyMiesiac, j));
                }
                komorka.innerHTML = j.toString();
                this.element['cialo'].appendChild(komorka);
            }
        };
        Kalendarz.prototype.stworzDziecko = function (klasa) {
            var naglowek = document.createElement("div");
            naglowek.setAttribute("class", klasa);
            return naglowek;
        };
        Kalendarz.prototype.stworzLegende = function () {
            for (var dzien in Kalendarz.dniTygodnia) {
                var dzienTygodnia = this.stworzDziecko(Kalendarz.dniTygodnia[dzien]);
                dzienTygodnia.innerHTML = Kalendarz.dniTygodnia[dzien];
                this.element['legenda'].appendChild(dzienTygodnia);
            }
        };
        Kalendarz.prototype.miesiacWstecz = function () {
            document.body.querySelector('.kalendarz').remove();
            var miesiacWstecz = new Miesiac_1.Miesiac(this.data, -1);
            this.uruchom(miesiacWstecz.pobierzObiektDaty());
        };
        Kalendarz.prototype.miesiacWPrzod = function () {
            document.body.querySelector('.kalendarz').remove();
            var miesiacWstecz = new Miesiac_1.Miesiac(this.data, 1);
            this.uruchom(miesiacWstecz.pobierzObiektDaty());
        };
        Kalendarz.prototype.odswiezKalendarzZZaznaczonymiDniami = function (dniDoZaznaczenia) {
            document.body.querySelector('.kalendarz').remove();
            var miesiacWstecz = new Miesiac_1.Miesiac(this.data, 0);
            this.uruchom(miesiacWstecz.pobierzObiektDaty());
            this.zaznaczDni(dniDoZaznaczenia);
        };
        Kalendarz.prototype.zaznaczDni = function (dniDoZaznaczenia) {
            console.log("dni do zaznaczenia", dniDoZaznaczenia);
            for (var i = 0; i <= dniDoZaznaczenia.length - 1; i++) { //cos tu chyba dniDoZaznaczenia = 0 a właściwie -1
                var data = dniDoZaznaczenia[i];
                var id = (data.toISOString().split('T'))[0];
                if (document.getElementById(id) != null) {
                    if (document.getElementById(id).classList.contains('wybrany_dzien')) {
                        var klasy = document.getElementById(id);
                        klasy.classList.remove('wybrany_dzien');
                    }
                    else {
                        var klasy = document.getElementById(id);
                        klasy.classList.add('wybrany_dzien');
                    }
                }
            }
        };
        Kalendarz.prototype.okreslId = function (miesiac, dzien) {
            var rokMiesiac = miesiac.pobierzRokMiesiac();
            var sformatowanyDzien = (dzien < 10) ? "0" + dzien : dzien.toString();
            return rokMiesiac + "-" + sformatowanyDzien;
        };
        Kalendarz.ileDniWWnierszu = 42;
        return Kalendarz;
    }());
    exports.Kalendarz = Kalendarz;
});
