export class Loader {
    private obiektLoader = null;
    private obiektKontener: JQuery<HTMLElement>;

    constructor() {
        this.obiektLoader = $('#loader');
        this.obiektKontener = $('#page-body');
    }

    public uruchom(zakryjDokument?): void{
        this.obiektLoader.show();
        if(zakryjDokument && zakryjDokument == true){
            this.obiektKontener.fadeOut();
        }
    }

    public wylacz(): void{
        this.obiektLoader.fadeOut();
    }
}