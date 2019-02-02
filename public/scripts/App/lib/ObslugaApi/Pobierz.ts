import {Request} from "../Util/Request";

export interface Wojewodztwa {
    readonly id: number;
    readonly nazwa: string;
}

interface Miasta extends Wojewodztwa{
    readonly id: number;
    readonly nazwa: string;
}

interface Ulice extends Miasta{
    readonly id: number;
    readonly nazwa: string;
    readonly miasto: number;
    readonly wojewodztwo: number;
}

export class Pobierz {
    private url: string;
    private request: Request;
    constructor(domena: string){
        this.url = domena;
        this.request = new Request();
    }

    public wojewodztwa(success: any, error: any, beforeSend: any){
        return Request.pobierz(this.url + '/adresy/pobierz/wojewodztwa', "GET", "", success, error, beforeSend);
    }
    public miasta(idWojewodztwa: number, success: any, error: any, beforeSend: any){
        return Request.pobierz(this.url + '/adresy/pobierz/miasta/' + idWojewodztwa, "GET", "", success, error, beforeSend);

    }
    public ulice(idMiasta: number, success: any, error: any, beforeSend: any){
        return Request.pobierz(this.url + '/adresy/pobierz/ulice/' + idMiasta, "GET", "", success, error, beforeSend)
    }


    public pobierzIdStrefy(wojewodztwo: number, miasto: number, ulica: number): number{
        return 12448;
    }

    public sprawdzDostepnoscMiejscWStrefie(strefa: number, daty: Array<Date>){
        return {
            dostepnoscWybranychDat: true,
            dostepnoscMiejsc: true,
            alternatywa: true,
            daty: {
                "18-11-2018": {
                    wolnychMiejsc: 145,
                    obserwujacych: 44,
                    godziny: [
                        [0, 1],
                        [3, 8],
                        [9, 11],
                        [15, 16],
                        [17, 19],
                        [20, 21],
                        [22, 23],
                        [23, 0]
                    ]
                },
                "19-11-2018": {
                    wolnychMiejsc: 88,
                    obserwujacych: 21,
                    godziny: [
                        [0, 3],
                        [15, 16],
                        [17, 19],
                        [20, 21],
                        [23, 0]
                    ]
                },
                "20-11-2018": {
                    wolnychMiejsc: 14,
                    obserwujacych: 4,
                    godziny: [
                        [0, 11],
                        [15, 16],
                        [20, 21],
                        [23, 0]
                    ]
                },
                "21-11-2018": {
                    wolnychMiejsc: 0,
                    obserwujacych: 4,
                    godziny: []
                }
            }
        }
    }

}