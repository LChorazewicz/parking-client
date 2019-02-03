import {OdpowiedzOferty} from "../ObslugaApi/Pobierz";

export class Modal {
    public pokazOknoZOfertami(oferta: OdpowiedzOferty){
        // @ts-ignore
        $("#modal-sprawdz-dostepnosc-ofert").modal();
        let kontener: JQuery<HTMLElement> = $("#modal-sprawdz-dostepnosc-ofert .container");
        kontener.empty();
        let wiadomosc: string;

        if(oferta.oferta){
            wiadomosc = "Znaleźliśmy ofertę w wybranej przez Ciebie lokalizacji!";
        }else{
            wiadomosc = "Niestety nie znaleźliśmy oferty w wybranej przez Ciebie lokalizacji :( ";
            if(oferta.alternatywa){
                wiadomosc += " ale znaleźliśmy w innej!";
            }
        }
        let divRow = this.dodajDiv("row");
        kontener.append(divRow);

        let div = this.dodajDiv("col-sm-12", "margin: 13px 0;");
        divRow.append(div);

        let paragraf: HTMLElement = this.dodajParagraf(wiadomosc, "text-center");
        div.append(paragraf);

        if(oferta.oferta){
            let kolumny: Array<string> = new Array<string>();
            kolumny.push("Odległość");
            kolumny.push("Lokalizacja");
            kolumny.push("Czas pobytu");
            kolumny.push("Cena za cały pobyt");
            let kolekcja: Array<Array<string>> = new Array<Array<string>>();

            for (let DTOOferta of oferta.oferty) {
                let tablica: Array<string> = new Array<string>();
                tablica.push(DTOOferta.id.toString());
                if(DTOOferta.odleglosc == " -- "){
                    tablica.push(DTOOferta.odleglosc);
                }else{
                    tablica.push(DTOOferta.odleglosc + "km");
                }
                tablica.push(DTOOferta.lokalizacja);
                tablica.push(DTOOferta.iloscGodzin.toString() + "h");
                tablica.push(DTOOferta.cena.toString() + "zł");
                kolekcja.push(tablica);
            }

            kontener.append(this.dodajTabelke(kolumny, kolekcja));

            if(oferta.alternatywa){
                let wiadomosc: string = "Cenimy to, że wybrałeś właśnie nas, dlatego przygotowaliślimy dla Ciebie także specjalną ofertę!";

                let divRow = this.dodajDiv("row");
                kontener.append(divRow);

                let div = this.dodajDiv("col-sm-12", "margin-bottom: 13px;");
                divRow.append(div);

                let paragraf: HTMLElement = this.dodajParagraf(wiadomosc, "text-center");
                div.append(paragraf);

                let kolumny: Array<string> = new Array<string>();
                kolumny.push("Odległość");
                kolumny.push("Lokalizacja");
                kolumny.push("Czas pobytu");
                kolumny.push("Cena za cały pobyt");
                let kolekcja: Array<Array<string>> = new Array<Array<string>>();

                for (let DTOOferta of oferta.alternatywy) {
                    let tablica: Array<string> = new Array<string>();
                    tablica.push(DTOOferta.id.toString());
                    if(DTOOferta.odleglosc == " -- "){
                        tablica.push(DTOOferta.odleglosc);
                    }else{
                        tablica.push(DTOOferta.odleglosc + "km");
                    }
                    tablica.push(DTOOferta.lokalizacja);
                    tablica.push(DTOOferta.iloscGodzin.toString() + "h");
                    tablica.push(DTOOferta.cena.toString() + "zł");
                    kolekcja.push(tablica);
                }
                kontener.append(this.dodajTabelke(kolumny, kolekcja));
            }
        }
        console.log(oferta);
    }

    private dodajTabelke(kolumny: Array<string>, trescKolumn: Array<Array<string>>): HTMLElement{
        let tabelka: HTMLElement = this.dodajElement('table', 'table table-striped table-bordered');
        let thead: HTMLElement = this.dodajElement('thead');
        let tr: HTMLElement = this.dodajElement('tr');
        thead.append(tr);
        tabelka.append(thead);

        for (let kolumna of kolumny) {
            let th: HTMLElement = this.dodajElement('th');
            th.innerText = kolumna;
            tr.append(th);
        }

        let tbody: HTMLElement = this.dodajElement('tbody');
        for (let kolekcja of trescKolumn) {
            let tr: HTMLElement = this.dodajElement('tr', "clickable-row");
            for (let i = 0; i <= kolekcja.length - 1; i++) {
                if(i == 0){
                    tr.setAttribute("data-id", kolekcja[i].toString());
                    continue;
                }
                let td: HTMLElement = this.dodajElement('td');
                td.innerText = kolekcja[i];
                tr.append(td);
            }
            tbody.append(tr);
        }
        tabelka.append(tbody);

        return tabelka;
    }

    private dodajElement(nazwaElementu: string, klasa?: string): HTMLElement{
        let element: HTMLElement = document.createElement(nazwaElementu);
        if(klasa != null){
            element.setAttribute("class", klasa);
        }
        return element;
    }

    private dodajParagraf(wiadomosc: string, klasa?: string): HTMLElement{
        let row: HTMLDivElement = document.createElement('div');
        row.innerText = wiadomosc;
        if(klasa != null){
            row.setAttribute("class", klasa);
        }
        return row;
    }

    private dodajDiv(klasa?: string, style?: string): HTMLElement{
        let element: HTMLElement = document.createElement('div');
        if(klasa != null){
            element.setAttribute("class", klasa);
        }
        if(style != null){
            element.setAttribute("style", style);
        }
        return element;
    }

    public pokazBladUzytkownikowi(blad: string){

        let kontener = $("#modal-blad .container");
        kontener.empty()

        let divRow = this.dodajDiv("row");
        kontener.append(divRow);

        let div = this.dodajDiv("col-sm-12", "margin: 13px 0;");
        divRow.append(div);

        let paragraf: HTMLElement = this.dodajParagraf(blad, "text-center");
        div.append(paragraf);

        // @ts-ignore
        $("#modal-blad").modal();
    }
}