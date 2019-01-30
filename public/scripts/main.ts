import app = require('./App/Aplikacja');

// @ts-ignore
let numerKroku: number = krok;
// @ts-ignore
let apiKey: string = apikey;
// @ts-ignore
let domena: string = Domena;

console.debug("Aktualny krok: " + numerKroku + " apikey " + apiKey + " domena " + domena);
let aplikakcja = new app.Aplikacja();
aplikakcja.uruchom(numerKroku, domena);