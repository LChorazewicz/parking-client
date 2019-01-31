define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Loader = /** @class */ (function () {
        function Loader() {
            this.obiektLoader = null;
            this.obiektLoader = $('#loader');
        }
        Loader.prototype.uruchom = function () {
            this.obiektLoader.show();
        };
        Loader.prototype.wylacz = function () {
            this.obiektLoader.hide();
        };
        return Loader;
    }());
    exports.Loader = Loader;
});
