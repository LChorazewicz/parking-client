define(["require", "exports", "./lib/ObslugaApi/Pobierz", "./lib/Util/Jquery", "./lib/Loader"], function (require, exports, Pobierz_1, $, Loader_1) {
    "use strict";
    exports.__esModule = true;
    var Krok = /** @class */ (function () {
        function Krok() {
            this.loader = new Loader_1.Loader();
        }
        Krok.prototype.uruchom = function (numerKroku, domena) {
            console.info("Uruchamiam krok" + numerKroku);
            var pobierz = new Pobierz_1.Pobierz(domena);
            switch (numerKroku) {
                case 1: {
                    var selectWojewodztwo_1 = document.getElementById("wojewodztwo");
                    var selectMiasto_1 = document.getElementById("miasto");
                    var selectUlica_1 = document.getElementById("ulica");
                    var loader_1 = this.loader;
                    pobierz.wojewodztwa(function (wojewodztwa) {
                        if (wojewodztwa.blad === true) {
                            window.location.href = domena + '/wystapil/blad';
                            return;
                        }
                        $.each(selectWojewodztwo_1.options, function (index) {
                            selectWojewodztwo_1.options.remove(index);
                        });
                        var option = document.createElement("option");
                        option.value = "0";
                        option.text = "-- Wybierz --";
                        option.disabled = true;
                        selectWojewodztwo_1.appendChild(option);
                        $.each(wojewodztwa, function (index, obj) {
                            var option = document.createElement("option");
                            option.value = obj.id.toString();
                            option.text = obj.nazwa.toString();
                            selectWojewodztwo_1.appendChild(option);
                        });
                        selectWojewodztwo_1.selectedIndex = 0;
                    }, function (response) {
                        console.log("Wystąpił błąd systemu, spróbuj ponownie za chwilę", response);
                    }, function () { });
                    selectMiasto_1.setAttribute("disabled", "true");
                    selectUlica_1.setAttribute("disabled", "true");
                    selectMiasto_1.selectedIndex = 0;
                    selectUlica_1.selectedIndex = 0;
                    $("#wojewodztwo").on("change", function () {
                        $.each(selectMiasto_1.options, function (index) {
                            selectMiasto_1.options.remove(index);
                        });
                        var option = document.createElement("option");
                        option.value = "0";
                        option.text = "-- Wybierz --";
                        option.disabled = true;
                        selectMiasto_1.appendChild(option);
                        pobierz.miasta(selectWojewodztwo_1.selectedIndex, function (response) {
                            if (response.blad === true) {
                                window.location.href = domena + '/wystapil/blad';
                                return;
                            }
                            $.each(response, function (index, obj) {
                                var option = document.createElement("option");
                                option.value = obj.id.toString();
                                option.text = obj.nazwa.toString();
                                selectMiasto_1.appendChild(option);
                            });
                            loader_1.wylacz();
                        }, function (response) {
                            loader_1.wylacz();
                            console.log("Wystąpił błąd systemu, spróbuj ponownie za chwilę", response);
                        }, function () {
                            loader_1.uruchom();
                        });
                        selectMiasto_1.selectedIndex = 0;
                        selectUlica_1.selectedIndex = 0;
                        selectMiasto_1.removeAttribute("disabled");
                        selectUlica_1.setAttribute("disabled", "true");
                    });
                    $("#miasto").on("change", function () {
                        $.each(selectUlica_1.options, function (index) {
                            selectUlica_1.options.remove(index);
                        });
                        var option = document.createElement("option");
                        option.value = "0";
                        option.text = "-- Wybierz --";
                        option.disabled = true;
                        selectUlica_1.appendChild(option);
                        pobierz.ulice(selectMiasto_1.selectedIndex, function (response) {
                            if (response.blad === true) {
                                window.location.href = domena + '/wystapil/blad';
                                return;
                            }
                            $.each(response, function (index, obj) {
                                var option = document.createElement("option");
                                option.value = obj.id.toString();
                                option.text = obj.nazwa.toString();
                                selectUlica_1.appendChild(option);
                            });
                            loader_1.wylacz();
                        }, function (response) {
                            loader_1.wylacz();
                            console.log("Wystąpił błąd systemu, spróbuj ponownie za chwilę", response);
                        }, function () {
                            loader_1.uruchom();
                        });
                        selectUlica_1.selectedIndex = 0;
                        selectUlica_1.removeAttribute("disabled");
                    });
                    break;
                }
                case 2: {
                    break;
                }
                case 3: {
                    break;
                }
            }
            console.info("Zakończyłem uruchamiać krok " + numerKroku);
        };
        return Krok;
    }());
    exports.Krok = Krok;
});
