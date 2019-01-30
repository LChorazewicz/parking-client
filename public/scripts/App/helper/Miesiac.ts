import {Kalendarz} from "../lib/kalendarz";

export interface MiesiacInterface {
    pobierzIloscDni(): number;//31
    pobierzIndexStartowy(): number;//4
    pobierzIloscDniDoWyswietlenia(): number;
    ustawMiesiac(number: number): void
}

export class Miesiac{
    private iloscDni = 0;
    private indexStartowy = 0;
    private obiektDaty: Date;
    private jakiToDzienTygodnia = 0;
    private static miesiace: Array<string> = [
        "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
        "Lipiec", "Sierpien", "Wrzesień", "Październik", "Listopad", "Grudzień",
    ];

    public constructor(data: Date, ileMiesiecyZmodyfikowac: number){
        this.obiektDaty = new Date(data.toString());
        this.ustawMiesiac(ileMiesiecyZmodyfikowac);

        this.indexStartowy = this.pobierzJakiToDzienTygodnia();
        this.iloscDni = this.pobierzIloscDniWMiesiacu();
        this.jakiToDzienTygodnia = this.pobierzJakiToDzienTygodnia();
    }

    pobierzIloscDni(): number {
        return this.iloscDni;
    }

    pobierzIndexStartowy(): number {
        return this.indexStartowy;
    }

    ustawIndexStartowy(index: number): void{
        this.indexStartowy = index;
    }

    private ustawMiesiac(number: number): void {
        this.obiektDaty.setMonth(this.obiektDaty.getMonth() + number);
    }

    pobierzNazweMiesiaca(): string {
        return Miesiac.miesiace[this.obiektDaty.getMonth()];
    }

    pobierzRok(): number{
        return this.obiektDaty.getFullYear()
    }

    private pobierzIloscDniWMiesiacu(): number {
        return new Date(this.obiektDaty.getFullYear(), this.obiektDaty.getMonth() + 1, 0).getDate();
    }

    private pobierzJakiToDzienTygodnia(): number {
        let dzienTygodnia: string = this.obiektDaty.toString().split(' ')[0];
        return Kalendarz.dniTygodniaAng.indexOf(dzienTygodnia.toLowerCase()) + 1;
    }

    public pobierzTabliceIloscDniMiesiaca(ileDniPobracOdKonca: number): Array<number>{
        let dni: Array<number> = [], iloscDniWMiesiacu: number = this.pobierzIloscDniWMiesiacu();
        for (let i = iloscDniWMiesiacu; i > iloscDniWMiesiacu - ileDniPobracOdKonca; i--) {
            dni.push(i);
        }
        return dni.reverse();
    }

    public pobierzObiektDaty() {
        return this.obiektDaty;
    }

    public pobierzMiesiacRok(): string {
        return (this.obiektDaty.getMonth() + 1) + "-" + this.obiektDaty.getFullYear();
    }

    public pobierzRokMiesiac(): string {
        let rok = this.obiektDaty.getFullYear();
        let miesiac = ((this.obiektDaty.getMonth() + 1) < 10) ? "0" + (this.obiektDaty.getMonth() + 1) : this.obiektDaty.getMonth() + 1;
        return  rok + "-" + miesiac;
    }
}