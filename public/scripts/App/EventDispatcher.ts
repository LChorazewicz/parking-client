import {Kalendarz} from "./lib/kalendarz";
import {OperacjeNaTablicach} from "./lib/OperacjeNaTablicach";
import {Walidacja} from "./lib/Walidacja/Walidacja";
import {ObslugaApi} from "./lib/ObslugaApi/ObslugaApi";
import {Loader} from "./lib/Loader";

export class EventDispatcher {
    public wstecz: HTMLElement;
    public doProdu: HTMLElement;
    public dniZKalendarza: HTMLElement;
    public dniWybrane: Array<Date> = [];
    public kalendarz;
    private operacjeNaTablicach: OperacjeNaTablicach;
    private przyciskPrzejdzNa2Krok: Element;
    private przyciskPrzejdzNa3Krok: Element;
    private przyciskPrzejdzNaPodsumowanie: Element;
    private przyciskPrzejdzNaStroneGlowna: Element;
    private loader: Loader;

    public constructor() {
        this.operacjeNaTablicach = new OperacjeNaTablicach();
        this.loader = new Loader();
    }

    public uruchom(numerKroku: number, domena: string) {
        switch (numerKroku) {
            case 1: {
                let elementKalendarz = document.body.querySelector("#termin") as HTMLInputElement;
                let kalendarz = this.kalendarz = new Kalendarz(elementKalendarz);
                let data: Date = new Date();
                this.kalendarz.uruchom(data);

                this.wstecz = document.body.querySelector(".wstecz");
                this.doProdu = document.body.querySelector(".do_przodu");
                this.przyciskPrzejdzNa2Krok = document.body.querySelector("#przejdzNa2Krok");
                this.dniZKalendarza = document.querySelector(".cialo");
                let _this = this;
                let dni = this.dniWybrane;

                this.wstecz.addEventListener("click", function () {
                    kalendarz.miesiacWstecz();
                    kalendarz.zaznaczDni(dni);
                    _this.odswiez();
                });

                this.doProdu.addEventListener("click", function () {
                    kalendarz.miesiacWPrzod();
                    kalendarz.zaznaczDni(dni);
                    _this.odswiez();
                });

                this.doProdu.addEventListener("click", function () {
                    kalendarz.miesiacWPrzod();
                    kalendarz.zaznaczDni(dni);
                    _this.odswiez();
                });

                this.przyciskPrzejdzNa2Krok.addEventListener("click", function () {
                    let walidacja = new Walidacja();
                    let poprawnieZwalidowany = true;
                    let dostepnosc = true;
                    let alternatywa = false;
                    let listaBledow: Array<string> = [];
                    let termin: HTMLInputElement = document.body.querySelector("#termin");

                    if (!walidacja.walidujDaty(dni)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Wybrany zakres dat nie jest poprawny!");
                        _this.pokazBladUzytkownikowi(termin, "Wybrany zakres dat nie jest poprawny!")
                    }

                    let wojewodztwoSelect: HTMLSelectElement = document.body.querySelector("select#wojewodztwo");
                    let wojewodztwo = (wojewodztwoSelect.options[wojewodztwoSelect.selectedIndex].value != 'undefined') ? parseInt(wojewodztwoSelect.options[wojewodztwoSelect.selectedIndex].value) : 0;
                    let miastoSelect: HTMLSelectElement = document.body.querySelector("#miasto");
                    let miasto = (miastoSelect.options[miastoSelect.selectedIndex].value != 'undefined') ? parseInt(miastoSelect.options[miastoSelect.selectedIndex].value) : 0;
                    let ulicaSelect: HTMLSelectElement = document.body.querySelector("#ulica");
                    let ulica = (ulicaSelect.options[ulicaSelect.selectedIndex].value != 'undefined') ? parseInt(ulicaSelect.options[ulicaSelect.selectedIndex].value) : 0;

                    if (poprawnieZwalidowany && !walidacja.naturalNumber(wojewodztwo)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Wybrane województwo nie jest obsługiwane przez Nasz system!");
                        _this.pokazBladUzytkownikowi(wojewodztwoSelect,"Wybrane województwo nie jest obsługiwane przez Nasz system!");
                    }

                    if (poprawnieZwalidowany && !walidacja.naturalNumber(miasto)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Wybrane miasto nie jest obsługiwane przez Nasz system!");
                        _this.pokazBladUzytkownikowi(miastoSelect,"Wybrane miasto nie jest obsługiwane przez Nasz system!");
                    }

                    if (poprawnieZwalidowany && !walidacja.naturalNumber(ulica)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Wybrane ulica nie jest obsługiwana przez Nasz system!");
                        _this.pokazBladUzytkownikowi(ulicaSelect,"Wybrane ulica nie jest obsługiwana przez Nasz system!");
                    }

                    if (poprawnieZwalidowany) {
                        let obslugaApi = new ObslugaApi();
                        let strefa = obslugaApi.pobierzObiektPobierz(domena).pobierzIdStrefy(wojewodztwo, miasto, ulica);

                        if (strefa <= 0) {
                            dostepnosc = false;
                            listaBledow.push("Wybrana strefa nie istnieje w Naszym systemie, spróbuj innej lokalizacji!");
                            _this.pokazBladSystemowy("Wybrana strefa nie istnieje w Naszym systemie, spróbuj innej lokalizacji!");
                        }

                        if (dostepnosc) {
                            let miejsca = obslugaApi.pobierzObiektPobierz(domena).sprawdzDostepnoscMiejscWStrefie(strefa, dni);

                            if (miejsca.dostepnoscMiejsc && !miejsca.dostepnoscWybranychDat) {
                                dostepnosc = false;
                                if (miejsca.alternatywa) {
                                    alternatywa = true;
                                    listaBledow.push("W wybranej lokalizacji nie ma wolnych miejsc w wybranym zakresie dat, ale nic straconego! " +
                                        "Zaznaczyliści w kalendarzu najbardziej zbliżoną ofertę, sprawdź czy oferta Ci odpowiada!");
                                    _this.pokazBladSystemowy("W wybranej lokalizacji nie ma wolnych miejsc w wybranym zakresie dat, ale nic straconego! " +
                                        "Zaznaczyliści w kalendarzu najbardziej zbliżoną ofertę, sprawdź czy oferta Ci odpowiada!");

                                } else {
                                    listaBledow.push("W wybranym przedziale dat nie ma wolnych miejsc!");
                                    _this.pokazBladSystemowy("W wybranym przedziale dat nie ma wolnych miejsc!");
                                }

                            } else if (dostepnosc && !miejsca.dostepnoscMiejsc && miejsca.dostepnoscWybranychDat) {
                                dostepnosc = false;
                                if (miejsca.alternatywa) {
                                    alternatywa = true;
                                    listaBledow.push("W wybranej lokalizacji nie ma wolnych miejsc w wybranym zakresie dat, ale nic straconego! " +
                                        "Zaznaczyliści w kalendarzu najbardziej zbliżoną ofertę, sprawdź czy oferta Ci odpowiada!");
                                    _this.pokazBladSystemowy("W wybranej lokalizacji nie ma wolnych miejsc w wybranym zakresie dat, ale nic straconego! " +
                                        "Zaznaczyliści w kalendarzu najbardziej zbliżoną ofertę, sprawdź czy oferta Ci odpowiada!");

                                } else {
                                    listaBledow.push("W wybranym przedziale dat nie ma wolnych miejsc!");
                                    _this.pokazBladSystemowy("W wybranym przedziale dat nie ma wolnych miejsc!");
                                }
                            } else {
                                if (dostepnosc && alternatywa || dostepnosc && !alternatywa) {
                                    alternatywa = false;
                                }

                                console.log("[info] znaleźliśmy dla Ciebie miejsce!");
                            }
                        }
                    }

                    if (dostepnosc && poprawnieZwalidowany) {
                        _this.loader.uruchom(true);
                        let form: HTMLFormElement = document.createElement('form');
                        form.action = "/czy-moge-przejsc-na-krok-2";
                        form.method = "POST";
                        // form.style("display", "none");

                        let sumaKontrolna: HTMLInputElement = document.createElement('input');
                        sumaKontrolna.setAttribute("type", "hidden");
                        sumaKontrolna.setAttribute("name", "sumaKontrolna");
                        sumaKontrolna.setAttribute("value", wojewodztwo + "-" + miasto + "-" + ulica);
                        form.append(sumaKontrolna);

                        let daty: HTMLInputElement = document.createElement('input');
                        daty.setAttribute("type", "hidden");
                        daty.setAttribute("name", "daty");
                        daty.setAttribute("value", dni.join(","));
                        form.append(daty);

                        document.body.appendChild(form);
                        $(form).submit();
                    }
                    console.debug(listaBledow);
                    console.debug("Dostępność " + dostepnosc);
                    console.debug("Alternatywa " + alternatywa);
                });


                this.dniZKalendarza.addEventListener("click", function (e) {
                    // @ts-ignore
                    let id: Array = e.target.id.split('-');
                    if (id[2]) {
                        id[2] = id[2].split("T")[0];
                        let data: Date = new Date(parseInt(id[0]), parseInt(id[1]) - 1, parseInt(id[2]) + 1);
                        _this.sprobujDodacElementDoTablicy(data);
                        kalendarz.odswiezKalendarzZZaznaczonymiDniami(dni);
                        _this.odswiez();
                    }
                });

                break;
            }

            case 2: {
                this.przyciskPrzejdzNa3Krok = document.body.querySelector("#przejdzNa3Krok");
                let rejestracja: HTMLInputElement = document.body.querySelector("#rejestracja"),
                    imie: HTMLInputElement = document.body.querySelector("#imie"),
                    nazwisko: HTMLInputElement = document.body.querySelector("#nazwisko"),
                    telefon: HTMLInputElement = document.body.querySelector("#telefon"),
                    zgoda1: HTMLInputElement = document.body.querySelector("#zgoda_1"),
                    zgoda2: HTMLInputElement = document.body.querySelector("#zgoda_2"),
                    zgoda3: HTMLInputElement = document.body.querySelector("#zgoda_3"),
                    zgoda4: HTMLInputElement = document.body.querySelector("#zgoda_4");
                    let _this = this;

                this.przyciskPrzejdzNa3Krok.addEventListener("click", function (e) {
                    let walidacja = new Walidacja();
                    let poprawnieZwalidowany = true;
                    let listaBledow: Array<string> = [];

                    if (walidacja.isEmpty(rejestracja.value)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Niepoprawna wartość w polu numer rejestracyjny");
                        _this.pokazBladUzytkownikowi(rejestracja, "Niepoprawna wartość w polu numer rejestracyjny")
                    }

                    if (poprawnieZwalidowany && walidacja.isEmpty(imie.value)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Niepoprawna wartość w polu imie");
                        _this.pokazBladUzytkownikowi(imie, "Niepoprawna wartość w polu imie")
                    }

                    if (poprawnieZwalidowany && walidacja.isEmpty(nazwisko.value)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Niepoprawna wartość w polu nazwisko");
                        _this.pokazBladUzytkownikowi(nazwisko, "Niepoprawna wartość w polu nazwisko")
                    }

                    if (poprawnieZwalidowany && walidacja.isEmpty(telefon.value)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Niepoprawna wartość w polu numer telefon");
                        _this.pokazBladUzytkownikowi(telefon, "Niepoprawna wartość w polu telefon")
                    }

                    if (poprawnieZwalidowany && !walidacja.isChecked(zgoda1)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Nie zaznaczono wszystkich wymaganych zgód");
                        _this.pokazBladUzytkownikowi(zgoda1, "Niepoprawna wartość w polu telefon")
                    }

                    if (poprawnieZwalidowany && !walidacja.isChecked(zgoda2)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Nie zaznaczono wszystkich wymaganych zgód");
                        _this.pokazBladUzytkownikowi(zgoda2, "Nie zaznaczono wszystkich wymaganych zgód")
                    }

                    if (poprawnieZwalidowany && !walidacja.isChecked(zgoda3)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Nie zaznaczono wszystkich wymaganych zgód");
                        _this.pokazBladUzytkownikowi(zgoda3, "Nie zaznaczono wszystkich wymaganych zgód")
                    }

                    if (poprawnieZwalidowany && !walidacja.isChecked(zgoda4)) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Nie zaznaczono wszystkich wymaganych zgód");
                        _this.pokazBladUzytkownikowi(zgoda4, "Nie zaznaczono wszystkich wymaganych zgód")
                    }

                    if (poprawnieZwalidowany) {
                        let form: HTMLFormElement = document.createElement('form');
                        form.action = "/czy-moge-przejsc-na-krok-3";
                        form.method = "POST";
                        // form.style("display", "none");

                        let imieInput: HTMLInputElement = document.createElement('input');
                        imieInput.setAttribute("type", "hidden");
                        imieInput.setAttribute("name", "imie");
                        imieInput.setAttribute("value", imie.value);
                        form.append(imieInput);

                        let nazwiskoInput: HTMLInputElement = document.createElement('input');
                        nazwiskoInput.setAttribute("type", "hidden");
                        nazwiskoInput.setAttribute("name", "nazwisko");
                        nazwiskoInput.setAttribute("value", nazwisko.value);
                        form.append(nazwiskoInput);

                        let telefonInput: HTMLInputElement = document.createElement('input');
                        telefonInput.setAttribute("type", "hidden");
                        telefonInput.setAttribute("name", "telefon");
                        telefonInput.setAttribute("value", telefon.value);
                        form.append(telefonInput);

                        let rejestracjaInput: HTMLInputElement = document.createElement('input');
                        rejestracjaInput.setAttribute("type", "hidden");
                        rejestracjaInput.setAttribute("name", "numer_rejestracyjny");
                        rejestracjaInput.setAttribute("value", rejestracja.value);
                        form.append(rejestracjaInput);

                        let zgoda_1Input: HTMLInputElement = document.createElement('input');
                        zgoda_1Input.setAttribute("type", "hidden");
                        zgoda_1Input.setAttribute("name", "zgoda_1");
                        zgoda_1Input.setAttribute("value", zgoda1.value);
                        form.append(zgoda_1Input);

                        let zgoda_2Input: HTMLInputElement = document.createElement('input');
                        zgoda_2Input.setAttribute("type", "hidden");
                        zgoda_2Input.setAttribute("name", "zgoda_2");
                        zgoda_2Input.setAttribute("value", zgoda2.value);
                        form.append(zgoda_2Input);

                        let zgoda_3Input: HTMLInputElement = document.createElement('input');
                        zgoda_3Input.setAttribute("type", "hidden");
                        zgoda_3Input.setAttribute("name", "zgoda_3");
                        zgoda_3Input.setAttribute("value", zgoda3.value);
                        form.append(zgoda_3Input);

                        let zgoda_4Input: HTMLInputElement = document.createElement('input');
                        zgoda_4Input.setAttribute("type", "hidden");
                        zgoda_4Input.setAttribute("name", "zgoda_4");
                        zgoda_4Input.setAttribute("value", zgoda4.value);
                        form.append(zgoda_4Input);

                        document.body.appendChild(form);
                        _this.loader.uruchom(true);
                        $(form).submit();
                    } else {
                        console.log(listaBledow);
                    }
                });

                break;
            }

            case 3: {
                this.przyciskPrzejdzNaPodsumowanie = document.body.querySelector("#przejdzNaPodsumowanie");
                let _this = this;

                this.przyciskPrzejdzNaPodsumowanie.addEventListener("click", function (e) {
                    let walidacja = new Walidacja();
                    let poprawnieZwalidowany = true;
                    let listaBledow: Array<string> = [];
                    let kodSms: HTMLInputElement = document.body.querySelector("#kod_dostepu");
                    if (walidacja.isEmpty(kodSms.value) && kodSms.value.length !== 6) {
                        poprawnieZwalidowany = false;
                        listaBledow.push("Wpisz kod dostępu z wiadomośći sms");
                        _this.pokazBladUzytkownikowi(kodSms, "Wpisz kod dostępu z wiadomośći sms");
                    }

                    if (poprawnieZwalidowany) {
                        let obslugaApi = new ObslugaApi();
                        // obslugaApi.pobierzObiektWaliduj().sprawdzCzyKodDostepuJestPoprawny(kodSms.value, function (response) {
                        let form: HTMLFormElement = document.createElement('form');
                        form.action = "/czy-moge-przejsc-na-podsumowanie";
                        form.method = "POST";
                        // form.style("display", "none");

                        let apiKey: HTMLInputElement = document.createElement('input');
                        apiKey.setAttribute("type", "hidden");
                        apiKey.setAttribute("name", "kod-sms");
                        apiKey.setAttribute("value", kodSms.value);
                        form.append(apiKey);

                        document.body.appendChild(form);
                        _this.loader.uruchom(true);

                        $(form).submit();
                        // }, function (response) {
                        //     poprawnieZwalidowany = false;
                        //     listaBledow.push("Podany kod dostępu jest niepoprawny.")
                        // });
                        console.log(listaBledow);
                    } else {
                        console.log(listaBledow);
                    }
                });
                break;
            }

            case 4: {
                let _this = this;
                this.przyciskPrzejdzNaStroneGlowna = document.body.querySelector("#przejdzNaStroneGlowna");
                this.przyciskPrzejdzNaStroneGlowna.addEventListener("click", function (e) {
                    window.location.href = "/krok-1";
                    _this.loader.uruchom(true);
                });
                break;
            }
        }

    }

    /**
     * odpowiedzialnosc: Używam metody odswiez() w momencie którym muszę zniszczyć kalendarz, przyciski i uruchomić je
     * na nowo - eventy usuwają się razem z nimi.
     */
    public odswiez() {
        this.wstecz = document.body.querySelector(".wstecz");
        this.doProdu = document.body.querySelector(".do_przodu");
        this.dniZKalendarza = document.querySelector(".cialo");
        let html = document.querySelector("select, input");
        let inputs = document.body.getElementsByTagName("select, input") as HTMLCollectionOf<HTMLElement>;
        let kalendarz = this.kalendarz;
        let event = this;
        let dni = this.dniWybrane;

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
            let id: Array = e.target.id.split('-');
            if (id[2]) {
                id[2] = id[2].split("T")[0];
                let data: Date = new Date(parseInt(id[0]), parseInt(id[1]) - 1, parseInt(id[2]) + 1);
                event.sprobujDodacElementDoTablicy(data);
                kalendarz.odswiezKalendarzZZaznaczonymiDniami(dni);
                event.odswiez();
            }
        });

        html.addEventListener("change", function () {
            console.log("234", inputs);//srednio dziala
            for (let i = 0; i <= inputs.length; i++){
                inputs.item(i).classList.replace('d-inline', 'd-none');
            }
        });
    }

    public sprobujDodacElementDoTablicy(data: Date): void {
        if (this.operacjeNaTablicach.czyTakieSameElementyDatyWystepujeWTablicy(data, this.dniWybrane)) {
            this.dniWybrane = this.operacjeNaTablicach.usunElementZTablicyPoPozycji(
                this.operacjeNaTablicach.znajdzPozycjeElementuDatyWTablicy(data, this.dniWybrane),
                this.dniWybrane
            );
        } else {
            this.dniWybrane.push(data);
        }
    }

    public pokazBladUzytkownikowi(element: HTMLSelectElement | HTMLInputElement, tresc: string){
        element.classList.add('is-invalid');
        element.focus();
        let elementDoTresciBledu: HTMLElement = element.parentElement.getElementsByTagName('small').item(0);
        elementDoTresciBledu.classList.replace('d-none', 'd-inline');
        elementDoTresciBledu.innerText = tresc;
    }

    public usunBladUzytkownika(element: HTMLSelectElement | HTMLInputElement){
        console.log(element);
        element.classList.remove('is-invalid');
        let elementDoTresciBledu: HTMLElement = element.parentElement.getElementsByTagName('small').item(0);
        elementDoTresciBledu.classList.replace('d-inline', 'd-none');
    }

    public pokazBladSystemowy(tresc: string, element?:HTMLElement){
        alert(tresc);
    }
}