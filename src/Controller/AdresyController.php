<?php

namespace App\Controller;

use App\Exceptions\WprowadzoneDaneSaNieprawidloweException;
use App\Exceptions\WystapilBladWKomunikacjiZApiException;
use App\Library\Api\Metody;
use App\Listeners\OpoznijMnie;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AdresyController
 * @package App\Controller
 * @Route("/adresy", name="adresy")
 */
class AdresyController extends Controller
{
    /**
     * @var Metody
     */
    private $api;

    /**
     * @var OpoznijMnie
     */
    private $opoznijMnie;

    /**
     * AdresyController constructor.
     * @param Metody $metodyApi
     * @param OpoznijMnie $opoznijMnie
     */
    public function __construct(Metody $metodyApi, OpoznijMnie $opoznijMnie)
    {
        $this->api = $metodyApi;
        $this->opoznijMnie = $opoznijMnie;
    }

    /**
     * @Route("/pobierz/wojewodztwa", name="wojewodztwa")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function wojewodztwa()
    {
        if((bool)$this->getParameter("czy_opozniac_ladowanie_adresow")){
            $this->opoznijMnie->naIleSekund(1);
            $this->opoznijMnie->opoznij();
        }

        try {
            $odpowidz = $this->api->pobierzWojewodztwa();
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            $odpowidz = ['blad' => true];
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            $odpowidz = ['blad' => true];
        }
        return new JsonResponse($odpowidz);
    }

    /**
     * @Route("/pobierz/miasta/{idWojewodztwa}", name="miasta")
     * @param int $idWojewodztwa
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function miasta(int $idWojewodztwa)
    {
        if((bool)$this->getParameter("czy_opozniac_ladowanie_adresow")){
            $this->opoznijMnie->naIleSekund(1);
            $this->opoznijMnie->opoznij();
        }

        try {
            $odpowidz = $this->api->pobierzMiasta($idWojewodztwa);
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            $odpowidz = ['blad' => true];
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            $odpowidz = ['blad' => true];
        }
        return new JsonResponse($odpowidz);
    }

    /**
     * @Route("/pobierz/ulice/{idMiasta}", name="ulice")
     * @param int $idMiasta
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function ulice(int $idMiasta)
    {
        if((bool)$this->getParameter("czy_opozniac_ladowanie_adresow")){
            $this->opoznijMnie->naIleSekund(1);
            $this->opoznijMnie->opoznij();
        }

        try {
            $odpowidz = $this->api->pobierzUlice($idMiasta);
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            $odpowidz = ['blad' => true];
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            $odpowidz = ['blad' => true];
        }
        return new JsonResponse($odpowidz);
    }
}
