import app = require('./App/Aplikacja');

// @ts-ignore
let numerKroku: number = krok;
// @ts-ignore
let domena: string = Domena;

(new app.Aplikacja()).uruchom(numerKroku, domena);