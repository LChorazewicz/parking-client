import {Pobierz} from "./Pobierz";
import {Waliduj} from "./Waliduj";

export class ObslugaApi {
    public pobierzObiektPobierz(domena: string): Pobierz{
        return new Pobierz(domena);
    }

    public pobierzObiektWaliduj(domena: string): Waliduj{
        return new Waliduj(domena);
    }

    public pobierzObiektAktualizuj(){

    }
}