import krok = require("./Krok");
import krokInterface = require("./KrokInterface");
import {EventDispatcher} from "./EventDispatcher";

export class Aplikacja{
    private krok: krokInterface.KrokInterface;

    constructor(){
        this.krok = new krok.Krok();
    }

    public uruchom(numerKroku: number, stronaBledu: string): void {
        this.krok.uruchom(numerKroku, stronaBledu);//ładuje dane do selectow i przygotowuje aplikacje;
        (new EventDispatcher()).uruchom(numerKroku, stronaBledu);//operuje na eventach, waliduje
    }
}