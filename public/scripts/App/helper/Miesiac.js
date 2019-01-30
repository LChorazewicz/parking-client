define(["require", "exports", "../lib/kalendarz"], function (require, exports, kalendarz_1) {
    "use strict";
    exports.__esModule = true;
    var Miesiac = /** @class */ (function () {
        function Miesiac(data, ileMiesiecyZmodyfikowac) {
            this.iloscDni = 0;
            this.indexStartowy = 0;
            this.jakiToDzienTygodnia = 0;
            this.obiektDaty = new Date(data.toString());
            this.ustawMiesiac(ileMiesiecyZmodyfikowac);
            this.indexStartowy = this.pobierzJakiToDzienTygodnia();
            this.iloscDni = this.pobierzIloscDniWMiesiacu();
            this.jakiToDzienTygodnia = this.pobierzJakiToDzienTygodnia();
        }
        Miesiac.prototype.pobierzIloscDni = function () {
            return this.iloscDni;
        };
        Miesiac.prototype.pobierzIndexStartowy = function () {
            return this.indexStartowy;
        };
        Miesiac.prototype.ustawIndexStartowy = function (index) {
            this.indexStartowy = index;
        };
        Miesiac.prototype.ustawMiesiac = function (number) {
            this.obiektDaty.setMonth(this.obiektDaty.getMonth() + number);
        };
        Miesiac.prototype.pobierzNazweMiesiaca = function () {
            return Miesiac.miesiace[this.obiektDaty.getMonth()];
        };
        Miesiac.prototype.pobierzRok = function () {
            return this.obiektDaty.getFullYear();
        };
        Miesiac.prototype.pobierzIloscDniWMiesiacu = function () {
            return new Date(this.obiektDaty.getFullYear(), this.obiektDaty.getMonth() + 1, 0).getDate();
        };
        Miesiac.prototype.pobierzJakiToDzienTygodnia = function () {
            var dzienTygodnia = this.obiektDaty.toString().split(' ')[0];
            return kalendarz_1.Kalendarz.dniTygodniaAng.indexOf(dzienTygodnia.toLowerCase()) + 1;
        };
        Miesiac.prototype.pobierzTabliceIloscDniMiesiaca = function (ileDniPobracOdKonca) {
            var dni = [], iloscDniWMiesiacu = this.pobierzIloscDniWMiesiacu();
            for (var i = iloscDniWMiesiacu; i > iloscDniWMiesiacu - ileDniPobracOdKonca; i--) {
                dni.push(i);
            }
            return dni.reverse();
        };
        Miesiac.prototype.pobierzObiektDaty = function () {
            return this.obiektDaty;
        };
        Miesiac.prototype.pobierzMiesiacRok = function () {
            return (this.obiektDaty.getMonth() + 1) + "-" + this.obiektDaty.getFullYear();
        };
        Miesiac.prototype.pobierzRokMiesiac = function () {
            var rok = this.obiektDaty.getFullYear();
            var miesiac = ((this.obiektDaty.getMonth() + 1) < 10) ? "0" + (this.obiektDaty.getMonth() + 1) : this.obiektDaty.getMonth() + 1;
            return rok + "-" + miesiac;
        };
        Miesiac.miesiace = [
            "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
            "Lipiec", "Sierpien", "Wrzesień", "Październik", "Listopad", "Grudzień",
        ];
        return Miesiac;
    }());
    exports.Miesiac = Miesiac;
});
