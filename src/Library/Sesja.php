<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 27.01.19
 * Time: 11:02
 */

namespace App\Library;


use App\DTO\Wniosek\WniosekApi;
use App\Exceptions\WystapilBladWKomunikacjiZApiException;
use App\Library\Api\Metody;
use App\Library\Api\Stale\StatusyWnioskuApi;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
 * Class Sesja
 * @package App\Library
 */
class Sesja
{
    /**
     * @var SessionInterface
     */
    private $sesja;

    /**
     * @var WniosekApi
     */
    private $wniosek;

    /**
     * @var Metody
     */
    private $metody;

    /**
     * Sesja constructor.
     * @param SessionInterface $session
     * @param Metody $metody
     * @throws \Exception
     */
    public function __construct(SessionInterface $session, Metody $metody)
    {
        $this->sesja = $session;
        $this->metody = $metody;
        if($this->pobierz("idWnioskuApi", null) !== null){
            $this->ustawWniosekApi();
        }
    }

    /**
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     * @throws \App\Exceptions\WystapilBladWKomunikacjiZApiException
     */
    public function rozpocznijSesjeApi()
    {
        if($this->sesja->get("idWnioskuApi", null) === null){
            $this->wniosek = $this->metody->stworzNowyWniosek();
            $this->ustaw("idWnioskuApi", $this->wniosek->getIdWnioskuApi())
                ->ustaw("status", $this->wniosek->getStatus());
        }else{
            $this->ustawWniosekApi();
        }
    }

    /**
     * @return bool
     */
    public function czySesjaApiZostalaZainicjowana()
    {
        return $this->sesja->get("idWnioskuApi", null) !== null;
    }

    /**
     * @param string $zmienna
     * @param null $domyslnaWartosc
     * @return mixed
     */
    public function pobierz(string $zmienna, $domyslnaWartosc = null)
    {
        return $this->sesja->get($zmienna, $domyslnaWartosc);
    }

    /**
     * @param string $zmienna
     * @param string $wartosc
     * @return $this
     */
    public function ustaw(string $zmienna, string $wartosc)
    {
        $this->sesja->set($zmienna, $wartosc);
        return $this;
    }

    /**
     * @return void
     */
    public function wyczysc()
    {
        $this->sesja->clear();
    }

    /**
     * @param $zmienna
     */
    public function usunZmiennaZSesji($zmienna)
    {
        $this->sesja->remove($zmienna);
    }

    /**
     * @throws WystapilBladWKomunikacjiZApiException
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     */
    public function restartujSesjeApi()
    {
        $this->wyczysc();
        $this->rozpocznijSesjeApi();
    }

    /**
     * @return WniosekApi|null
     * @throws WystapilBladWKomunikacjiZApiException
     */
    public function pobierzWniosekApi()
    {
        if($this->wniosek === null){
            $this->ustawWniosekApi();
        }

        return $this->wniosek;
    }

    /**
     * @throws WystapilBladWKomunikacjiZApiException
     */
    private function ustawWniosekApi()
    {
        if($this->sesja === null){
            throw new WystapilBladWKomunikacjiZApiException("sesja nie została zainicjowana");
        }

        $this->wniosek = new WniosekApi([
            'idWnioskuApi' => $this->pobierz("idWnioskuApi", null),
            'status' => $this->pobierz("status", StatusyWnioskuApi::WNIOSEK_KROK_1)
        ]);
    }

    /**
     * @return array
     */
    public function pobierzSesje()
    {
        return [
            'idWnioskuApi' => $this->sesja->get("idWnioskuApi"),
            'status' => $this->sesja->get("status")
        ];
    }

    /**
     * @throws WystapilBladWKomunikacjiZApiException
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     */
    public function odswiezSesjeApi()
    {
        $wniosek = $this->metody->pobierzWniosek($this->pobierz("idWnioskuApi"));

        $this->wniosek = $wniosek;
        $this->ustaw("idWnioskuApi", $this->wniosek->getIdWnioskuApi())
            ->ustaw("status", $this->wniosek->getStatus());
    }
}