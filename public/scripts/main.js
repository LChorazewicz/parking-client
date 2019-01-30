define(["require", "exports", "./App/Aplikacja"], function (require, exports, app) {
    "use strict";
    exports.__esModule = true;
    // @ts-ignore
    var numerKroku = krok;
    // @ts-ignore
    var apiKey = apikey;
    // @ts-ignore
    var stronaBledu = stronabledu;
    console.debug("Aktualny krok: " + numerKroku + " apikey " + apiKey + " strona błędu " + stronaBledu);
    var aplikakcja = new app.Aplikacja();
    aplikakcja.uruchom(numerKroku, stronaBledu);
});
