import {KrokInterface} from "./KrokInterface";
import {Pobierz} from "./lib/ObslugaApi/Pobierz";
import * as $ from "./lib/Util/Jquery";

export class Krok implements KrokInterface {
    uruchom(numerKroku: number, domena: string): void {
        console.info("Uruchamiam krok" + numerKroku);
        let pobierz: Pobierz = new Pobierz(domena);
        switch (numerKroku) {
            case 1: {
                let selectWojewodztwo: HTMLSelectElement = document.getElementById("wojewodztwo") as HTMLSelectElement;
                let selectMiasto: HTMLSelectElement = document.getElementById("miasto") as HTMLSelectElement;
                let selectUlica: HTMLSelectElement = document.getElementById("ulica") as HTMLSelectElement;

                pobierz.wojewodztwa(function (wojewodztwa) {
                    if(wojewodztwa.blad === true){
                        window.location.href = domena + '/wystapil/blad';
                        return;
                    }
                    $.each(selectWojewodztwo.options, function (index) {
                        selectWojewodztwo.options.remove(index);
                    });

                    let option: HTMLOptionElement = document.createElement("option");
                    option.value = "0";
                    option.text = "-- Wybierz --";
                    option.disabled = true;
                    selectWojewodztwo.appendChild(option);

                    $.each(wojewodztwa, function (index, obj) {
                        let option: HTMLOptionElement = document.createElement("option");
                        option.value = obj.id.toString();
                        option.text = obj.nazwa.toString();
                        selectWojewodztwo.appendChild(option);
                    });
                    selectWojewodztwo.selectedIndex = 0;

                }, function (response) {
                    console.log("Wystąpił błąd systemu, spróbuj ponownie za chwilę", response);
                });


                selectMiasto.setAttribute("disabled", "true");
                selectUlica.setAttribute("disabled", "true");

                $("#wojewodztwo").on("change", function () {
                    $.each(selectMiasto.options, function (index) {
                        selectMiasto.options.remove(index);
                    });

                    let option: HTMLOptionElement = document.createElement("option");
                    option.value = "0";
                    option.text = "-- Wybierz --";
                    option.disabled = true;

                    selectMiasto.appendChild(option);

                    pobierz.miasta(selectWojewodztwo.selectedIndex,function (response) {
                        if(response.blad === true){
                            window.location.href = domena + '/wystapil/blad';
                            return;
                        }
                        $.each(response, function (index, obj) {
                            let option = document.createElement("option");
                            option.value = obj.id.toString();
                            option.text = obj.nazwa.toString();
                            selectMiasto.appendChild(option);
                        });
                    }, function (response) {
                        console.log("Wystąpił błąd systemu, spróbuj ponownie za chwilę", response)
                    });

                    selectMiasto.selectedIndex = 0;
                    selectUlica.selectedIndex = 0;

                    selectMiasto.removeAttribute("disabled");
                    selectUlica.setAttribute("disabled", "true");
                });

                $("#miasto").on("change", function () {
                    $.each(selectUlica.options, function (index) {
                        selectUlica.options.remove(index);
                    });

                    let option: HTMLOptionElement = document.createElement("option");
                    option.value = "0";
                    option.text = "-- Wybierz --";
                    option.disabled = true;
                    selectUlica.appendChild(option);

                    pobierz.ulice(selectMiasto.selectedIndex, function (response) {
                        if(response.blad === true){
                            window.location.href = domena + '/wystapil/blad';
                            return;
                        }
                        $.each(response, function (index, obj) {
                            let option = document.createElement("option");
                            option.value = obj.id.toString();
                            option.text = obj.nazwa.toString();
                            selectUlica.appendChild(option);
                        });
                    }, function (response) {
                        console.log("Wystąpił błąd systemu, spróbuj ponownie za chwilę", response)
                    });

                    selectUlica.selectedIndex = 0;

                    selectUlica.removeAttribute("disabled");
                });
                break;
            }

            case 2: {

                break;
            }
        }
        console.info("Zakończyłem uruchamiać krok " + numerKroku);
    }
}