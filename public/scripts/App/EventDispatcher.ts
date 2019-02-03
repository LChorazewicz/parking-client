import {Kalendarz} from "./lib/kalendarz";
import {OperacjeNaTablicach} from "./lib/OperacjeNaTablicach";
import {Walidacja} from "./lib/Walidacja/Walidacja";
import {ObslugaApi} from "./lib/ObslugaApi/ObslugaApi";
import {Loader} from "./lib/Loader";
import {Modal} from "./lib/Util/Modal";
import {OdpowiedzOferty, oferta} from "./lib/ObslugaApi/Pobierz";

export class EventDispatcher {
    public wstecz: HTMLElement;
    public doProdu: HTMLElement;
    public dniZKalendarza: HTMLElement;
    public dniWybrane: Array<Date> = [];
    public kalendarz;
    private operacjeNaTablicach: OperacjeNaTablicach;
    private przyciskSprawdzDostepnoscOfert: Element;
    private przyciskPrzejdzNa3Krok: Element;
    private przyciskPrzejdzNaPodsumowanie: Element;
    private przyciskPrzejdzNaStroneGlowna: Element;
    private loader: Loader;
    private przyciskPrzejdzNa2Krok: Element;

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
                this.przyciskSprawdzDostepnoscOfert = document.body.querySelector("#przyciskSprawdzDostepnoscOfert");
                this.przyciskPrzejdzNa2Krok = document.body.querySelector("#przyciskPrzejdzNa2Krok");
                this.dniZKalendarza = document.querySelector(".cialo");
                let wybranaOferta: HTMLElement | null = document.querySelector(".clickable-row.bg-info");
                let idWybranejOferty = 0;
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

                this.przyciskSprawdzDostepnoscOfert.addEventListener("click", function () {
                    let walidacja = new Walidacja();
                    let poprawnieZwalidowany = true;
                    let dostepnosc = true;
                    let termin: HTMLInputElement = document.body.querySelector("#termin");

                    if (!walidacja.walidujDaty(dni)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Wybrany zakres dat nie jest poprawny!")
                    }

                    let wojewodztwoSelect: HTMLSelectElement = document.body.querySelector("select#wojewodztwo");
                    let wojewodztwo = (wojewodztwoSelect.options[wojewodztwoSelect.selectedIndex].value != 'undefined') ? parseInt(wojewodztwoSelect.options[wojewodztwoSelect.selectedIndex].value) : 0;
                    let miastoSelect: HTMLSelectElement = document.body.querySelector("#miasto");
                    let miasto = (miastoSelect.options[miastoSelect.selectedIndex].value != 'undefined') ? parseInt(miastoSelect.options[miastoSelect.selectedIndex].value) : 0;
                    let ulicaSelect: HTMLSelectElement = document.body.querySelector("#ulica");
                    let ulica = (ulicaSelect.options[ulicaSelect.selectedIndex].value != 'undefined') ? parseInt(ulicaSelect.options[ulicaSelect.selectedIndex].value) : 0;

                    if (poprawnieZwalidowany && !walidacja.naturalNumber(wojewodztwo)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Wybrane województwo nie jest obsługiwane przez Nasz system!");
                    }

                    if (poprawnieZwalidowany && !walidacja.naturalNumber(miasto)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Wybrane miasto nie jest obsługiwane przez Nasz system!");
                    }

                    if (poprawnieZwalidowany && !walidacja.naturalNumber(ulica)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Wybrane ulica nie jest obsługiwana przez Nasz system!");
                    }

                    if (poprawnieZwalidowany) {
                        let obslugaApi = new ObslugaApi();
                        let strefa = obslugaApi.pobierzObiektPobierz(domena).pobierzIdStrefy(wojewodztwo, miasto, ulica);

                        if (strefa <= 0) {
                            dostepnosc = false;
                            _this.pokazBladSystemowy("Wybrana strefa nie istnieje w Naszym systemie, spróbuj innej lokalizacji!");
                        }

                        if (dostepnosc) {
                            let miejsca = obslugaApi.pobierzObiektPobierz(domena).sprawdzDostepnaOferte(strefa, dni);
                            let oferta: OdpowiedzOferty;
                            if (!miejsca.oferta && !miejsca.alternatywa) {
                                dostepnosc = false;
                            }

                            if(dostepnosc && miejsca.oferta){
                                oferta = miejsca;
                            }

                            if(dostepnosc && !miejsca.oferta && miejsca.alternatywa){
                                oferta = miejsca;
                            }

                            if(oferta != null){
                                idWybranejOferty = 0;
                                let modal = new Modal();
                                modal.pokazOknoZOfertami(oferta);
                            }
                        }
                    }
                });

                $(document).on('click', '.clickable-row', function() {
                    idWybranejOferty = parseInt($(this).attr("data-id"));
                    console.log("Wybrana oferta to: " + idWybranejOferty);
                });

                this.przyciskPrzejdzNa2Krok.addEventListener("click", function (e) {
                    if (idWybranejOferty != 0) {
                        _this.loader.uruchom(true);
                        let form: HTMLFormElement = document.createElement('form');
                        form.action = "/czy-moge-przejsc-na-krok-2";
                        form.method = "POST";
                        // form.style("display", "none");
                        document.body.appendChild(form);
                        $(form).submit();
                    }else{
                        _this.pokazBladUzytkownikowi("Nie wybrałeś oferty")
                    }
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

                    if (walidacja.isEmpty(rejestracja.value)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Niepoprawna wartość w polu numer rejestracyjny")
                    }

                    if (poprawnieZwalidowany && walidacja.isEmpty(imie.value)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Niepoprawna wartość w polu imie")
                    }

                    if (poprawnieZwalidowany && walidacja.isEmpty(nazwisko.value)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Niepoprawna wartość w polu nazwisko")
                    }

                    if (poprawnieZwalidowany && walidacja.isEmpty(telefon.value)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Niepoprawna wartość w polu telefon")
                    }

                    if (poprawnieZwalidowany && !walidacja.isChecked(zgoda1)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Niepoprawna wartość w polu telefon")
                    }

                    if (poprawnieZwalidowany && !walidacja.isChecked(zgoda2)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Nie zaznaczono wszystkich wymaganych zgód")
                    }

                    if (poprawnieZwalidowany && !walidacja.isChecked(zgoda3)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Nie zaznaczono wszystkich wymaganych zgód")
                    }

                    if (poprawnieZwalidowany && !walidacja.isChecked(zgoda4)) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Nie zaznaczono wszystkich wymaganych zgód")
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
                    let kodSms: HTMLInputElement = document.body.querySelector("#kod_dostepu");
                    if (walidacja.isEmpty(kodSms.value) && kodSms.value.length !== 6) {
                        poprawnieZwalidowany = false;
                        _this.pokazBladUzytkownikowi("Wpisz kod dostępu z wiadomośći sms");
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

    public pokazBladUzytkownikowi(tresc: string){
        let modal = new Modal();
        modal.pokazBladUzytkownikowi(tresc);
        return;
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