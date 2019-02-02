import {Request} from "../Util/Request";

export class Waliduj {
    private url: string;
    private request: Request;

    constructor(domena: string) {
        this.url = domena;
        this.request = new Request();
    }

    public sprawdzCzyStrefaIstnieje(wojewodztwo: number, miasto: number, ulica: number){
        return true;
    }

    sprawdzCzyKodDostepuJestPoprawny(kodDostepu: string, success: any, error: any, beforeSend): void {
        Request.pobierz(this.url + "/sprawdz/kod-sms/"+kodDostepu, "GET", "", success, error, beforeSend);
    }
}