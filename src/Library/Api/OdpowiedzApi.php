<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 30.01.19
 * Time: 09:05
 */

namespace App\Library\Api;


use App\DTO\Api\Dane;
use App\DTO\Api\Meta;
use App\Exceptions\WprowadzoneDaneSaNieprawidloweException;
use App\Exceptions\WystapilBladWKomunikacjiZApiException;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class OdpowiedzApi
 * @package App\Library\Api
 */
class OdpowiedzApi
{
    /**
     * @var Meta
     */
    private $meta = null;

    /**
     * @var Dane
     */
    private $dane = null;

    /**
     * OdpowiedzApi constructor.
     * @param \stdClass $odpowiedz
     * @throws WprowadzoneDaneSaNieprawidloweException
     * @throws WystapilBladWKomunikacjiZApiException
     */
    public function __construct(\stdClass $odpowiedz)
    {
        try{
            $this->meta = new Meta();
            $this->dane = new Dane();
            $this->ustaw($odpowiedz);
        }catch (WprowadzoneDaneSaNieprawidloweException $e){
            throw new WprowadzoneDaneSaNieprawidloweException();
        }catch (WystapilBladWKomunikacjiZApiException $e){
            throw new WystapilBladWKomunikacjiZApiException();
        }
    }

    /**
     * @param \stdClass $odpowiedz
     * @throws WprowadzoneDaneSaNieprawidloweException
     * @throws WystapilBladWKomunikacjiZApiException
     */
    private function ustaw(\stdClass $odpowiedz)
    {
        if (isset($odpowiedz->meta)) {
            $meta = $odpowiedz->meta;
            if (in_array($meta->kod_odpowiedzi, [Response::HTTP_OK, Response::HTTP_CREATED])) {
                $this->meta->kodOdpowiedzi = isset($meta->kod_odpowiedzi) ? $meta->kod_odpowiedzi : null;
                $this->meta->ilosc = isset($meta->ilosc) ? $meta->ilosc : null;
                $this->meta->idWnioskuApi = isset($meta->id_wniosku_api) ? $meta->id_wniosku_api : null;
                $this->meta->daneWejsciowe = isset($meta->dane_wejsciowe) ? (array)$meta->dane_wejsciowe : null;
                $dane = $odpowiedz->dane;
                $this->dane->status = isset($dane->status) ? $dane->status : null;
                if (!$dane instanceof \stdClass && isset($dane[0]) && $dane[0] instanceof \stdClass) {
                    $this->dane->kolekcja = $dane;
                }
            } elseif (in_array($meta->kod_odpowiedzi, [Response::HTTP_NO_CONTENT])) {
                $this->meta->kodOdpowiedzi = isset($meta->kod_odpowiedzi) ? $meta->kod_odpowiedzi : null;
                $this->meta->daneWejsciowe = isset($meta->dane_wejsciowe) ? $meta->dane_wejsciowe : null;
            } elseif (in_array($meta->kod_odpowiedzi, [Response::HTTP_BAD_REQUEST])) {
                throw new WprowadzoneDaneSaNieprawidloweException("Wprowadzone dane są nieprawidłowe");
            } else {
                throw new WystapilBladWKomunikacjiZApiException("Wystąpił błąd w komunikacji z API");
            }
        }
    }

    /**
     * @return Meta
     */
    public function pobierzMeta()
    {
        return $this->meta;
    }

    /**
     * @return Dane
     */
    public function pobierzDane()
    {
        return $this->dane;
    }
}