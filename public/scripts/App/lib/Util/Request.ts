export class Request {
    public static pobierz(url: string, metoda: string, dane: string, success, error, beforeSend): void{
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
    }
}