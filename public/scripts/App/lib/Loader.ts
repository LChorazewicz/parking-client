export class Loader {
    private obiektLoader = null;

    constructor() {
        this.obiektLoader = $('#loader');
    }

    public uruchom(): void{
        this.obiektLoader.show();
    }

    public wylacz(): void{
        this.obiektLoader.hide();
    }
}