import app = require('./App/Aplikacja');

// @ts-ignore
let numerKroku: number = krok;
// @ts-ignore
let apiKey: string = apikey;
// @ts-ignore
let stronaBledu: string = stronabledu;

console.debug("Aktualny krok: " + numerKroku + " apikey " + apiKey + " strona błędu " + stronaBledu);
let aplikakcja = new app.Aplikacja();
aplikakcja.uruchom(numerKroku, stronaBledu);