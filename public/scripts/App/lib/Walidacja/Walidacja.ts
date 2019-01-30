import walidacjaInterface = require("./WalidacjaInterface");

export class Walidacja implements walidacjaInterface.WalidacjaInterface{
    constructor(){

    }
    twoDates(firstDate: Date, secondDate: Date){
        if(isNaN(firstDate.getTime())){
            return false;
        }

        if(isNaN(secondDate.getTime())){
            return false;
        }

        let today = new Date;

        if(firstDate.getTime() < today.getTime()){
            console.log("data_od nie może być wcześniejsza niż dzisiejsza!");
            return false;
        }

        if(secondDate.getTime() < secondDate.getTime()){
            console.log("data_do nie może być wcześniejsza niż dzisiejsza!");
            return false;
        }

        return true;
    }

    naturalNumber(value: number){
        if(value === null){
            return false;
        }
        return (value >= 1);
    }

    isChecked(obj:HTMLInputElement){
        return obj.checked;
    }

    isEmpty(value: string){
        if(value === null){
            return true;
        }

        if(value.length <= 0){
            return true;
        }

        return false;
    }

    public walidujDaty(dni: Array<Date>): boolean {
        return dni.length > 0;
    }
}