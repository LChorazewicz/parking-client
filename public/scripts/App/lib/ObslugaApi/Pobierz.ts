import {Request} from "../Util/Request";

export interface Wojewodztwa {
    readonly id: number;
    readonly nazwa: string;
}

interface Miasta extends Wojewodztwa {
    readonly id: number;
    readonly nazwa: string;
}

interface Ulice extends Miasta {
    readonly id: number;
    readonly nazwa: string;
    readonly miasto: number;
    readonly wojewodztwo: number;
}

export interface oferta {
    readonly id: number;
    readonly odleglosc: string;
    readonly lokalizacja: string;
    readonly iloscGodzin: number;
    readonly cena: number;
}

export interface alternatywa extends oferta {
}

export interface OdpowiedzOferty {
    readonly oferta: boolean;
    readonly alternatywa: boolean;
    readonly oferty: oferta[];
    readonly alternatywy: alternatywa[];
}

export class Pobierz {
    private url: string;
    private request: Request;

    constructor(domena: string) {
        this.url = domena;
        this.request = new Request();
    }

    public wojewodztwa(success: any, error: any, beforeSend: any) {
        return Request.pobierz(this.url + '/adresy/pobierz/wojewodztwa', "GET", "", success, error, beforeSend);
    }

    public miasta(idWojewodztwa: number, success: any, error: any, beforeSend: any) {
        return Request.pobierz(this.url + '/adresy/pobierz/miasta/' + idWojewodztwa, "GET", "", success, error, beforeSend);

    }

    public ulice(idMiasta: number, success: any, error: any, beforeSend: any) {
        return Request.pobierz(this.url + '/adresy/pobierz/ulice/' + idMiasta, "GET", "", success, error, beforeSend)
    }


    public pobierzIdStrefy(wojewodztwo: number, miasto: number, ulica: number): number {
        return 12448;
    }

    public sprawdzDostepnaOferte(strefa: number, daty: Array<Date>): OdpowiedzOferty {
        let oferty: oferta[] = [
            {
                id: 123,
                odleglosc: " -- ",
                lokalizacja: 'Ostrołęka, Sikorskiego 5',
                iloscGodzin: 48,
                cena: 37
            }
        ];
        let alternatywy: alternatywa[] = [
            {
                id: 124,
                odleglosc: "1.32",
                lokalizacja: 'Ostrołęka, Sikorskiego 164',
                iloscGodzin: 48,
                cena: 38
            },
            {
                id: 125,
                odleglosc: "1.41",
                lokalizacja: 'Ostrołęka, Sikorskiego 9',
                iloscGodzin: 48,
                cena: 34
            }
        ];
        return {
            oferta: true,
            alternatywa: true,
            oferty: oferty,
            alternatywy: alternatywy
        }
    }

}