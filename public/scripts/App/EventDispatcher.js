define(["require", "exports", "./lib/kalendarz", "./lib/OperacjeNaTablicach", "./lib/Walidacja/Walidacja", "./lib/ObslugaApi/ObslugaApi", "./lib/Loader", "./lib/Util/Modal"], function (require, exports, kalendarz_1, OperacjeNaTablicach_1, Walidacja_1, ObslugaApi_1, Loader_1, Modal_1) {
    "use strict";
    exports.__esModule = true;
    var EventDispatcher = /** @class */ (function () {
        function EventDispatcher() {
            this.dniWybrane = [];
            this.operacjeNaTablicach = new OperacjeNaTablicach_1.OperacjeNaTablicach();
            this.loader = new Loader_1.Loader();
        }
        EventDispatcher.prototype.uruchom = function (numerKroku, domena) {
            switch (numerKroku) {
                case 1: {
                    var elementKalendarz = document.body.querySelector("#termin");
                    var kalendarz_2 = this.kalendarz = new kalendarz_1.Kalendarz(elementKalendarz);
                    var data = new Date();
                    this.kalendarz.uruchom(data);
                    this.wstecz = document.body.querySelector(".wstecz");
                    this.doProdu = document.body.querySelector(".do_przodu");
                    this.przyciskSprawdzDostepnoscOfert = document.body.querySelector("#przyciskSprawdzDostepnoscOfert");
                    this.przyciskPrzejdzNa2Krok = document.body.querySelector("#przyciskPrzejdzNa2Krok");
                    this.dniZKalendarza = document.querySelector(".cialo");
                    var wybranaOferta = document.querySelector(".clickable-row.bg-info");
                    var idWybranejOferty_1 = 0;
                    var _this_1 = this;
                    var dni_1 = this.dniWybrane;
                    this.wstecz.addEventListener("click", function () {
                        kalendarz_2.miesiacWstecz();
                        kalendarz_2.zaznaczDni(dni_1);
                        _this_1.odswiez();
                    });
                    this.doProdu.addEventListener("click", function () {
                        kalendarz_2.miesiacWPrzod();
                        kalendarz_2.zaznaczDni(dni_1);
                        _this_1.odswiez();
                    });
                    this.doProdu.addEventListener("click", function () {
                        kalendarz_2.miesiacWPrzod();
                        kalendarz_2.zaznaczDni(dni_1);
                        _this_1.odswiez();
                    });
                    this.przyciskSprawdzDostepnoscOfert.addEventListener("click", function () {
                        var walidacja = new Walidacja_1.Walidacja();
                        var poprawnieZwalidowany = true;
                        var dostepnosc = true;
                        var termin = document.body.querySelector("#termin");
                        if (!walidacja.walidujDaty(dni_1)) {
                            poprawnieZwalidowany = false;
                            _this_1.pokazBladUzytkownikowi("Wybrany zakres dat nie jest poprawny!");
                        }
                        var wojewodztwoSelect = document.body.querySelector("select#wojewodztwo");
                        var wojewodztwo = (wojewodztwoSelect.options[wojewodztwoSelect.selectedIndex].value != 'undefined') ? parseInt(wojewodztwoSelect.options[wojewodztwoSelect.selectedIndex].value) : 0;
                        var miastoSelect = document.body.querySelector("#miasto");
                        var miasto = (miastoSelect.options[miastoSelect.selectedIndex].value != 'undefined') ? parseInt(miastoSelect.options[miastoSelect.selectedIndex].value) : 0;
                        var ulicaSelect = document.body.querySelector("#ulica");
                        var ulica = (ulicaSelect.options[ulicaSelect.selectedIndex].value != 'undefined') ? parseInt(ulicaSelect.options[ulicaSelect.selectedIndex].value) : 0;
                        if (poprawnieZwalidowany && !walidacja.naturalNumber(wojewodztwo)) {
                            poprawnieZwalidowany = false;
                            _this_1.pokazBladUzytkownikowi("Wybrane województwo nie jest obsługiwane przez Nasz system!");
                        }
                        if (poprawnieZwalidowany && !walidacja.naturalNumber(miasto)) {
                            poprawnieZwalidowany = false;
                            _this_1.pokazBladUzytkownikowi("Wybrane miasto nie jest obsługiwane przez Nasz system!");
                        }
                        if (poprawnieZwalidowany && !walidacja.naturalNumber(ulica)) {
                            poprawnieZwalidowany = false;
                            _this_1.pokazBladUzytkownikowi("Wybrane ulica nie jest obsługiwana przez Nasz system!");
                        }
                        if (poprawnieZwalidowany) {
                            var obslugaApi = new ObslugaApi_1.ObslugaApi();
                            var strefa = obslugaApi.pobierzObiektPobierz(domena).pobierzIdStrefy(wojewodztwo, miasto, ulica);
                            if (strefa <= 0) {
                                dostepnosc = false;
                                _this_1.pokazBladSystemowy("Wybrana strefa nie istnieje w Naszym systemie, spróbuj innej lokalizacji!");
                            }
                            if (dostepnosc) {
                                var miejsca = obslugaApi.pobierzObiektPobierz(domena).sprawdzDostepnaOferte(strefa, dni_1);
                                var oferta = void 0;
                                if (!miejsca.oferta && !miejsca.alternatywa) {
                                    dostepnosc = false;
                                }
                                if (dostepnosc && miejsca.oferta) {
                                    oferta = miejsca;
                                }
                                if (dostepnosc && !miejsca.oferta && miejsca.alternatywa) {
                                    oferta = miejsca;
                                }
                                if (oferta != null) {
                                    idWybranejOferty_1 = 0;
                                    var modal = new Modal_1.Modal();
                                    modal.pokazOknoZOfertami(oferta);
                                }
                            }
                        }
                    });
                    $(document).on('click', '.clickable-row', function () {
                        idWybranejOferty_1 = parseInt($(this).attr("data-id"));
                        console.log("Wybrana oferta to: " + idWybranejOferty_1);
                    });
                    this.przyciskPrzejdzNa2Krok.addEventListener("click", function (e) {
                        if (idWybranejOferty_1 != 0) {
                            _this_1.loader.uruchom(true);
                            var form = document.createElement('form');
                            form.action = "/czy-moge-przejsc-na-krok-2";
                            form.method = "POST";
                            // form.style("display", "none");
                            document.body.appendChild(form);
                            $(form).submit();
                        }
                        else {
                            _this_1.pokazBladUzytkownikowi("Nie wybrałeś oferty");
                        }
                    });
                    this.dniZKalendarza.addEventListener("click", function (e) {
                        // @ts-ignore
                        var id = e.target.id.split('-');
                        if (id[2]) {
                            id[2] = id[2].split("T")[0];
                            var data_1 = new Date(parseInt(id[0]), parseInt(id[1]) - 1, parseInt(id[2]) + 1);
                            _this_1.sprobujDodacElementDoTablicy(data_1);
                            kalendarz_2.odswiezKalendarzZZaznaczonymiDniami(dni_1);
                            _this_1.odswiez();
                        }
                    });
                    break;
                }
                case 2: {
                    this.przyciskPrzejdzNa3Krok = document.body.querySelector("#przejdzNa3Krok");
                    var rejestracja_1 = document.body.querySelector("#rejestracja"), imie_1 = document.body.querySelector("#imie"), nazwisko_1 = document.body.querySelector("#nazwisko"), telefon_1 = document.body.querySelector("#telefon"), zgoda1_1 = document.body.querySelector("#zgoda_1"), zgoda2_1 = document.body.querySelector("#zgoda_2"), zgoda3_1 = document.body.querySelector("#zgoda_3"), zgoda4_1 = document.body.querySelector("#zgoda_4");
                    var _this_2 = this;
                    this.przyciskPrzejdzNa3Krok.addEventListener("click", function (e) {
                        var walidacja = new Walidacja_1.Walidacja();
                        var poprawnieZwalidowany = true;
                        if (walidacja.isEmpty(rejestracja_1.value)) {
                            poprawnieZwalidowany = false;
                            _this_2.pokazBladUzytkownikowi("Niepoprawna wartość w polu numer rejestracyjny");
                        }
                        if (poprawnieZwalidowany && walidacja.isEmpty(imie_1.value)) {
                            poprawnieZwalidowany = false;
                            _this_2.pokazBladUzytkownikowi("Niepoprawna wartość w polu imie");
                        }
                        if (poprawnieZwalidowany && walidacja.isEmpty(nazwisko_1.value)) {
                            poprawnieZwalidowany = false;
                            _this_2.pokazBladUzytkownikowi("Niepoprawna wartość w polu nazwisko");
                        }
                        if (poprawnieZwalidowany && walidacja.isEmpty(telefon_1.value)) {
                            poprawnieZwalidowany = false;
                            _this_2.pokazBladUzytkownikowi("Niepoprawna wartość w polu telefon");
                        }
                        if (poprawnieZwalidowany && !walidacja.isChecked(zgoda1_1)) {
                            poprawnieZwalidowany = false;
                            _this_2.pokazBladUzytkownikowi("Niepoprawna wartość w polu telefon");
                        }
                        if (poprawnieZwalidowany && !walidacja.isChecked(zgoda2_1)) {
                            poprawnieZwalidowany = false;
                            _this_2.pokazBladUzytkownikowi("Nie zaznaczono wszystkich wymaganych zgód");
                        }
                        if (poprawnieZwalidowany && !walidacja.isChecked(zgoda3_1)) {
                            poprawnieZwalidowany = false;
                            _this_2.pokazBladUzytkownikowi("Nie zaznaczono wszystkich wymaganych zgód");
                        }
                        if (poprawnieZwalidowany && !walidacja.isChecked(zgoda4_1)) {
                            poprawnieZwalidowany = false;
                            _this_2.pokazBladUzytkownikowi("Nie zaznaczono wszystkich wymaganych zgód");
                        }
                        if (poprawnieZwalidowany) {
                            var form = document.createElement('form');
                            form.action = "/czy-moge-przejsc-na-krok-3";
                            form.method = "POST";
                            // form.style("display", "none");
                            var imieInput = document.createElement('input');
                            imieInput.setAttribute("type", "hidden");
                            imieInput.setAttribute("name", "imie");
                            imieInput.setAttribute("value", imie_1.value);
                            form.append(imieInput);
                            var nazwiskoInput = document.createElement('input');
                            nazwiskoInput.setAttribute("type", "hidden");
                            nazwiskoInput.setAttribute("name", "nazwisko");
                            nazwiskoInput.setAttribute("value", nazwisko_1.value);
                            form.append(nazwiskoInput);
                            var telefonInput = document.createElement('input');
                            telefonInput.setAttribute("type", "hidden");
                            telefonInput.setAttribute("name", "telefon");
                            telefonInput.setAttribute("value", telefon_1.value);
                            form.append(telefonInput);
                            var rejestracjaInput = document.createElement('input');
                            rejestracjaInput.setAttribute("type", "hidden");
                            rejestracjaInput.setAttribute("name", "numer_rejestracyjny");
                            rejestracjaInput.setAttribute("value", rejestracja_1.value);
                            form.append(rejestracjaInput);
                            var zgoda_1Input = document.createElement('input');
                            zgoda_1Input.setAttribute("type", "hidden");
                            zgoda_1Input.setAttribute("name", "zgoda_1");
                            zgoda_1Input.setAttribute("value", zgoda1_1.value);
                            form.append(zgoda_1Input);
                            var zgoda_2Input = document.createElement('input');
                            zgoda_2Input.setAttribute("type", "hidden");
                            zgoda_2Input.setAttribute("name", "zgoda_2");
                            zgoda_2Input.setAttribute("value", zgoda2_1.value);
                            form.append(zgoda_2Input);
                            var zgoda_3Input = document.createElement('input');
                            zgoda_3Input.setAttribute("type", "hidden");
                            zgoda_3Input.setAttribute("name", "zgoda_3");
                            zgoda_3Input.setAttribute("value", zgoda3_1.value);
                            form.append(zgoda_3Input);
                            var zgoda_4Input = document.createElement('input');
                            zgoda_4Input.setAttribute("type", "hidden");
                            zgoda_4Input.setAttribute("name", "zgoda_4");
                            zgoda_4Input.setAttribute("value", zgoda4_1.value);
                            form.append(zgoda_4Input);
                            document.body.appendChild(form);
                            _this_2.loader.uruchom(true);
                            $(form).submit();
                        }
                    });
                    break;
                }
                case 3: {
                    this.przyciskPrzejdzNaPodsumowanie = document.body.querySelector("#przejdzNaPodsumowanie");
                    var _this_3 = this;
                    this.przyciskPrzejdzNaPodsumowanie.addEventListener("click", function (e) {
                        var walidacja = new Walidacja_1.Walidacja();
                        var poprawnieZwalidowany = true;
                        var kodSms = document.body.querySelector("#kod_dostepu");
                        if (walidacja.isEmpty(kodSms.value) && kodSms.value.length !== 6) {
                            poprawnieZwalidowany = false;
                            _this_3.pokazBladUzytkownikowi("Wpisz kod dostępu z wiadomośći sms");
                        }
                        if (poprawnieZwalidowany) {
                            var obslugaApi = new ObslugaApi_1.ObslugaApi();
                            // obslugaApi.pobierzObiektWaliduj().sprawdzCzyKodDostepuJestPoprawny(kodSms.value, function (response) {
                            var form = document.createElement('form');
                            form.action = "/czy-moge-przejsc-na-podsumowanie";
                            form.method = "POST";
                            // form.style("display", "none");
                            var apiKey = document.createElement('input');
                            apiKey.setAttribute("type", "hidden");
                            apiKey.setAttribute("name", "kod-sms");
                            apiKey.setAttribute("value", kodSms.value);
                            form.append(apiKey);
                            document.body.appendChild(form);
                            _this_3.loader.uruchom(true);
                            $(form).submit();
                            // }, function (response) {
                            //     poprawnieZwalidowany = false;
                            //     listaBledow.push("Podany kod dostępu jest niepoprawny.")
                            // });
                        }
                    });
                    break;
                }
                case 4: {
                    var _this_4 = this;
                    this.przyciskPrzejdzNaStroneGlowna = document.body.querySelector("#przejdzNaStroneGlowna");
                    this.przyciskPrzejdzNaStroneGlowna.addEventListener("click", function (e) {
                        window.location.href = "/krok-1";
                        _this_4.loader.uruchom(true);
                    });
                    break;
                }
            }
        };
        /**
         * odpowiedzialnosc: Używam metody odswiez() w momencie którym muszę zniszczyć kalendarz, przyciski i uruchomić je
         * na nowo - eventy usuwają się razem z nimi.
         */
        EventDispatcher.prototype.odswiez = function () {
            this.wstecz = document.body.querySelector(".wstecz");
            this.doProdu = document.body.querySelector(".do_przodu");
            this.dniZKalendarza = document.querySelector(".cialo");
            var html = document.querySelector("select, input");
            var inputs = document.body.getElementsByTagName("select, input");
            var kalendarz = this.kalendarz;
            var event = this;
            var dni = this.dniWybrane;
            this.wstecz.addEventListener("click", function () {
                kalendarz.miesiacWstecz();
                kalendarz.zaznaczDni(dni);
                event.odswiez();
            });
            this.doProdu.addEventListener("click", function () {
                kalendarz.miesiacWPrzod();
                kalendarz.zaznaczDni(dni);
                event.odswiez();
            });
            this.dniZKalendarza.addEventListener("click", function (e) {
                // @ts-ignore
                var id = e.target.id.split('-');
                if (id[2]) {
                    id[2] = id[2].split("T")[0];
                    var data = new Date(parseInt(id[0]), parseInt(id[1]) - 1, parseInt(id[2]) + 1);
                    event.sprobujDodacElementDoTablicy(data);
                    kalendarz.odswiezKalendarzZZaznaczonymiDniami(dni);
                    event.odswiez();
                }
            });
            html.addEventListener("change", function () {
                console.log("234", inputs); //srednio dziala
                for (var i = 0; i <= inputs.length; i++) {
                    inputs.item(i).classList.replace('d-inline', 'd-none');
                }
            });
        };
        EventDispatcher.prototype.sprobujDodacElementDoTablicy = function (data) {
            if (this.operacjeNaTablicach.czyTakieSameElementyDatyWystepujeWTablicy(data, this.dniWybrane)) {
                this.dniWybrane = this.operacjeNaTablicach.usunElementZTablicyPoPozycji(this.operacjeNaTablicach.znajdzPozycjeElementuDatyWTablicy(data, this.dniWybrane), this.dniWybrane);
            }
            else {
                this.dniWybrane.push(data);
            }
        };
        EventDispatcher.prototype.pokazBladUzytkownikowi = function (tresc) {
            var modal = new Modal_1.Modal();
            modal.pokazBladUzytkownikowi(tresc);
            return;
        };
        EventDispatcher.prototype.usunBladUzytkownika = function (element) {
            console.log(element);
            element.classList.remove('is-invalid');
            var elementDoTresciBledu = element.parentElement.getElementsByTagName('small').item(0);
            elementDoTresciBledu.classList.replace('d-inline', 'd-none');
        };
        EventDispatcher.prototype.pokazBladSystemowy = function (tresc, element) {
            alert(tresc);
        };
        return EventDispatcher;
    }());
    exports.EventDispatcher = EventDispatcher;
});
