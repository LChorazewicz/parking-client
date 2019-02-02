define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Loader = /** @class */ (function () {
        function Loader() {
            this.obiektLoader = null;
            this.obiektLoader = $('#loader');
            this.obiektKontener = $('#page-body');
        }
        Loader.prototype.uruchom = function (zakryjDokument) {
            this.obiektLoader.show();
            if (zakryjDokument && zakryjDokument == true) {
                this.obiektKontener.fadeOut();
            }
        };
        Loader.prototype.wylacz = function () {
            this.obiektLoader.fadeOut();
        };
        return Loader;
    }());
    exports.Loader = Loader;
});
