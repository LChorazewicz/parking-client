import krok = require("./Krok");
import krokInterface = require("./KrokInterface");
import {EventDispatcher} from "./EventDispatcher";

export class Aplikacja{
    private krok: krokInterface.KrokInterface;

    constructor(){
        this.krok = new krok.Krok();
    }

    public uruchom(numerKroku: number, domena: string): void {
        this.krok.uruchom(numerKroku, domena);//ładuje dane do selectow i przygotowuje aplikacje;
        (new EventDispatcher()).uruchom(numerKroku, domena);//operuje na eventach, waliduje
    }
}