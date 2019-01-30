import {Pobierz} from "./Pobierz";
import {Waliduj} from "./Waliduj";

export class ObslugaApi {
    public pobierzObiektPobierz(): Pobierz{
        return new Pobierz();
    }

    public pobierzObiektWaliduj(): Waliduj{
        return new Waliduj();
    }

    public pobierzObiektAktualizuj(){

    }
}