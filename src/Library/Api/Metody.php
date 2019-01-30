<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 23.01.19
 * Time: 22:53
 */

namespace App\Library\Api;


use App\DTO\Adresy\Miasto;
use App\DTO\Adresy\Ulica;
use App\DTO\Adresy\Wojewodztwo;
use App\DTO\Wniosek\WniosekApi;
use App\Exceptions\WprowadzoneDaneSaNieprawidloweException;
use App\Exceptions\WystapilBladWKomunikacjiZApiException;
use App\Library\Api\Stale\MetodyApi;
use App\Library\Api\Stale\StatusyWnioskuApi;

class Metody extends MetodyAbstract
{
    /**
     * @var WniosekApi
     */
    private $wniosek;

    /**
     * @return WniosekApi
     * @throws WystapilBladWKomunikacjiZApiException
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     */
    public function stworzNowyWniosek()
    {
        try {
            $odpowiedz = $this->uruchomMetodeApi(MetodyApi::STWORZ_WNIOSEK);
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }

        $idWnioskuApi = $odpowiedz->pobierzMeta()->idWnioskuApi;
        $status = $odpowiedz->pobierzDane()->status;

        $wniosek = ['idWnioskuApi' => $idWnioskuApi, 'status' => $status];
        return new WniosekApi($wniosek);
    }

    /**
     * @return Wojewodztwo[]
     * @throws WystapilBladWKomunikacjiZApiException
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     */
    public function pobierzWojewodztwa()
    {
        try {
            $odpowiedz = $this->uruchomMetodeApi(MetodyApi::POBIERZ_WOJEWODZTWA);
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }

        $wojewodztwa = [];
        foreach ($odpowiedz->pobierzDane()->kolekcja as $wojewodztwo) {
            $wojewodztwa[] = new Wojewodztwo((array)$wojewodztwo);
        }
        return $wojewodztwa;
    }

    /**
     * @param int $idWojewodztwa
     * @return Miasto[]
     * @throws WystapilBladWKomunikacjiZApiException
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     */
    public function pobierzMiasta(int $idWojewodztwa)
    {
        try {
            $odpowiedz = $this->uruchomMetodeApi(MetodyApi::POBIERZ_MIASTA, ['idWojewodztwa' => $idWojewodztwa]);
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }
        $miasta = [];
        foreach ($odpowiedz->pobierzDane()->kolekcja as $miasto) {
            $miasta[] = new Miasto((array)$miasto);
        }
        return $miasta;
    }

    /**
     * @param int $idMiasta
     * @return Ulica[]
     * @throws WystapilBladWKomunikacjiZApiException
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     */
    public function pobierzUlice(int $idMiasta)
    {
        try {
            $odpowiedz = $this->uruchomMetodeApi(MetodyApi::POBIERZ_ULICE, ['idMiasta' => $idMiasta]);
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }
        $ulice = [];
        foreach ($odpowiedz->pobierzDane()->kolekcja as $ulica) {
            $ulice[] = new Ulica((array)$ulica);
        }
        return $ulice;
    }

    /**
     * @param $kodSms
     * @return bool
     * @throws WystapilBladWKomunikacjiZApiException
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     */
    public function sprawdzKodSms($kodSms)
    {
        try {
            $odpowiedz = (bool)$this->uruchomMetodeApi(MetodyApi::SPRAWDZ_KOD_SMS, ['kodSms' => $kodSms, 'idWnioskuApi' => $this->wniosek->getIdWnioskuApi()])->pobierzDane()->status;
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }
        return $odpowiedz;
    }

    /**
     * @param $idWnioskuApi
     * @return bool
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     * @throws \App\Exceptions\WystapilBladWKomunikacjiZApiException
     */
    public function czyWymusicRestartSesji($idWnioskuApi)
    {
        try {
            $odpowiedz = (bool)$this->uruchomMetodeApi(MetodyApi::CZY_WYMUSIC_RESTART_SESJI, ['idWnioskuApi' => $idWnioskuApi])->pobierzDane()->status;
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }
        return $odpowiedz;
    }

    /**
     * @param string $sumaKontrolna
     * @return bool
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     * @throws \App\Exceptions\WystapilBladWKomunikacjiZApiException
     */
    public function sprawdzSumeKontrolna(string $sumaKontrolna)
    {
        try {
            $odpowiedz = $this->uruchomMetodeApi(MetodyApi::SPRAWDZ_SUME_KONTROLNA, ['sumaKontrolna' => $sumaKontrolna])->pobierzDane()->status;
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }
        return $odpowiedz;
    }

    /**
     * @param WniosekApi $wniosekApi
     * @param $nowyStatus
     * @param array $daneDoAktualizacji
     * @return array
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     * @throws \App\Exceptions\WystapilBladWKomunikacjiZApiException
     */
    public function aktualizujWniosek(WniosekApi $wniosekApi, $nowyStatus, array $daneDoAktualizacji)
    {
        $daneDoAktualizacji = array_merge(['idWnioskuApi' => $wniosekApi->getIdWnioskuApi(), 'staryStatus' => $wniosekApi->getStatus(), 'nowyStatus' => $nowyStatus], $daneDoAktualizacji);
        try {
            switch ($nowyStatus) {
                case StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_1:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                case StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_1:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                case StatusyWnioskuApi::WNIOSEK_KROK_2:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                case StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_2:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                case StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_2:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                case StatusyWnioskuApi::WNIOSEK_KROK_3:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                case StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_3:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                case StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_3:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                case StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_PODSUMOWANIE:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                case StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_PODSUMOWANIE:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                case StatusyWnioskuApi::WNIOSEK_PODSUMOWANIE:
                    {
                        $zaktualizowanyWniosek = $this->uruchomMetodeApi(MetodyApi::AKTUALIZUJ_WNIOSEK, $daneDoAktualizacji);
                        break;
                    }
                default:
                    throw new WystapilBladWKomunikacjiZApiException("Nieznana metoda API");
            }

        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }
        return $zaktualizowanyWniosek->pobierzDane()->kolekcja;
    }

    /**
     * @param $idWnioskuApi
     * @return WniosekApi
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     * @throws \App\Exceptions\WystapilBladWKomunikacjiZApiException
     */
    public function pobierzWniosek($idWnioskuApi)
    {
        try {
            $dane = $this->uruchomMetodeApi(MetodyApi::POBIERZ_WNIOSEK, ['idWnioskuApi' => $idWnioskuApi])->pobierzDane()->kolekcja;
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }
        return new WniosekApi((array)$dane[0]);
    }

    /**
     * @param WniosekApi $wniosekApi
     */
    public function ustawWniosek(WniosekApi $wniosekApi)
    {
        $this->wniosek = $wniosekApi;
    }

    /**
     * @param array $zgody
     * @return bool
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     * @throws \App\Exceptions\WystapilBladWKomunikacjiZApiException
     */
    public function sprawdzZgody(array $zgody)
    {
        try {
            $odpowiedz = (bool)$this->uruchomMetodeApi(MetodyApi::SPRAWDZ_ZGODY, ['zgody' => $zgody])->pobierzDane()->status;
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }
        return $odpowiedz;
    }
}