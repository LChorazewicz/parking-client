define(["require", "exports", "./App/Aplikacja"], function (require, exports, app) {
    "use strict";
    exports.__esModule = true;
    // @ts-ignore
    var numerKroku = krok;
    // @ts-ignore
    var domena = Domena;
    (new app.Aplikacja()).uruchom(numerKroku, domena);
});
