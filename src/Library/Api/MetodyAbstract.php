<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 23.01.19
 * Time: 23:07
 */

namespace App\Library\Api;


use App\Exceptions\WprowadzoneDaneSaNieprawidloweException;
use App\Exceptions\WystapilBladWKomunikacjiZApiException;
use App\Library\Api\Stale\MetodyApi;
use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;

/**
 * Class MetodyAbstract
 * @package App\Library\Api
 */
abstract class MetodyAbstract
{
    /**
     * @var string
     */
    private $url;

    /**
     * MetodyAbstract constructor.
     * @param string $url
     */
    public function __construct(string $url)
    {
        $this->url = $url;
    }

    /**
     * @param string $metoda
     * @param array $daneDodatkowe
     * @return OdpowiedzApi
     * @throws WystapilBladWKomunikacjiZApiException
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     */
    protected function uruchomMetodeApi(string $metoda, array $daneDodatkowe = [])
    {
        $polaczenie = new Client(['base_uri' => $this->url, 'http_errors' => false]);
        $odpowiedzApi = null;

        $obiekt = null;
        switch ($metoda) {
            case MetodyApi::STWORZ_WNIOSEK:
                {
                    $obiekt = $polaczenie->post(MetodyApi::STWORZ_WNIOSEK . "?XDEBUG_SESSION_START=PHPSTORM");
                    break;
                }

            case MetodyApi::POBIERZ_WOJEWODZTWA:
                {
                    $obiekt = $polaczenie->get(MetodyApi::POBIERZ_WOJEWODZTWA . "?XDEBUG_SESSION_START=PHPSTORM");
                    break;
                }

            case MetodyApi::POBIERZ_MIASTA:
                {
                    $id = intval($daneDodatkowe['idWojewodztwa']);
                    if (is_numeric($id)) {
                        $obiekt = $polaczenie->get(MetodyApi::POBIERZ_MIASTA . '/' . $id . "?XDEBUG_SESSION_START=PHPSTORM");
                    }
                    break;
                }

            case MetodyApi::POBIERZ_ULICE:
                {
                    $id = intval($daneDodatkowe['idMiasta']);
                    if (is_numeric($id)) {
                        $obiekt = $polaczenie->get(MetodyApi::POBIERZ_ULICE . '/' . $id . "?XDEBUG_SESSION_START=PHPSTORM");
                    }
                    break;
                }

            case MetodyApi::CZY_WYMUSIC_RESTART_SESJI:
                {
                    $id = $daneDodatkowe['idWnioskuApi'];
                    $obiekt = $polaczenie->get(MetodyApi::CZY_WYMUSIC_RESTART_SESJI . '/' . $id . "?XDEBUG_SESSION_START=PHPSTORM");
                    break;
                }

            case MetodyApi::SPRAWDZ_SUME_KONTROLNA:
                {
                    $suma = $daneDodatkowe['sumaKontrolna'];
                    $obiekt = $polaczenie->get(MetodyApi::SPRAWDZ_SUME_KONTROLNA . '/' . $suma . "?XDEBUG_SESSION_START=PHPSTORM");
                    break;
                }

            case MetodyApi::AKTUALIZUJ_WNIOSEK:
                {
                    $obiekt = $polaczenie->patch(MetodyApi::AKTUALIZUJ_WNIOSEK . "?XDEBUG_SESSION_START=PHPSTORM", [
                        RequestOptions::JSON => $daneDodatkowe
                    ]);
                    break;
                }

            case MetodyApi::POBIERZ_WNIOSEK:
                {
                    $obiekt = $polaczenie->get(MetodyApi::POBIERZ_WNIOSEK . '/' . $daneDodatkowe['idWnioskuApi'] . "?XDEBUG_SESSION_START=PHPSTORM");
                    break;
                }

            case MetodyApi::SPRAWDZ_KOD_SMS:
                {
                    $kodSms = $daneDodatkowe['kodSms'];
                    $idWnioskuApi = $daneDodatkowe['idWnioskuApi'];
                    $obiekt = $polaczenie->get(MetodyApi::SPRAWDZ_KOD_SMS . '/' . $kodSms . '/idWnioskuApi/' . $idWnioskuApi . "?XDEBUG_SESSION_START=PHPSTORM");
                    break;
                }
            case MetodyApi::SPRAWDZ_ZGODY:
                {
                    $zgody = $daneDodatkowe['zgody'];

                    $obiekt = $polaczenie->post(MetodyApi::SPRAWDZ_ZGODY . "?XDEBUG_SESSION_START=PHPSTORM", [
                        RequestOptions::JSON => $zgody
                    ]);
                    break;
                }
        }
        try {
            $stdClass = json_decode($obiekt->getBody()->getContents());

            if ($obiekt === null || $stdClass === null) {
                throw new WystapilBladWKomunikacjiZApiException("Wystąpił błąd w komunikacji z API");
            }

            $odpowiedzApi = new OdpowiedzApi($stdClass);

        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            throw new WprowadzoneDaneSaNieprawidloweException();
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            throw new WystapilBladWKomunikacjiZApiException();
        }
        return $odpowiedzApi;
    }
}