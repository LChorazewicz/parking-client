export class OperacjeNaTablicach {
    public czyElementWystepujeWTablicy(element: any, tablica: Array<any>): boolean{
        let znaleziony = false;
        for (let i = 0; i < tablica.length; i++) {
            if (tablica[i] === element) {
                znaleziony = true; break;
            }
        }

        return znaleziony;
    }

    public czyTakieSameElementyDatyWystepujeWTablicy(element: Date, tablica: Array<Date>): boolean{
        let znaleziony = false;
        for (let i = 0; i < tablica.length; i++) {
            if (tablica[i].getTime() === element.getTime()) {
                znaleziony = true; break;
            }
        }

        return znaleziony;
    }

    public znajdzPozycjeElementuWTablicy(element: any, tablica: Array<any>): number{
        let pozycja = -1;
        for (let i = 0; i < tablica.length; i++) {
            if (tablica[i] === element) {
                pozycja = i; break;
            }
        }
        return pozycja;
    }

    public znajdzPozycjeElementuDatyWTablicy(element: Date, tablica: Array<Date>): number{
        let pozycja = -1;
        for (let i = 0; i < tablica.length; i++) {
            if (tablica[i].getTime() === element.getTime()) {
                pozycja = i; break;
            }
        }
        return pozycja;
    }

    public usunElementZTablicy(element: any, tablica: Array<Date>) {
        return tablica.filter(e => e !== element);
    }

    public usunElementZTablicyPoPozycji(pozycja: number, tablica: Array<Date>) {
        tablica.splice(pozycja, 1);
        return tablica;
    }
}