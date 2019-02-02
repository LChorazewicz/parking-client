define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Request = /** @class */ (function () {
        function Request() {
        }
        Request.pobierz = function (url, metoda, dane, success, error, beforeSend) {
            $.ajax({
                type: metoda,
                url: url,
                // The key needs to match your method's input parameter (case-sensitive).
                data: dane,
                contentType: "application/json; charset=utf-8",
                beforeSend: beforeSend,
                dataType: "json",
                async: false,
                success: success,
                error: error
            });
        };
        return Request;
    }());
    exports.Request = Request;
});
