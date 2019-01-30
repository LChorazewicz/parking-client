<?php

namespace App\Controller;

use App\Exceptions\WprowadzoneDaneSaNieprawidloweException;
use App\Exceptions\WystapilBladWKomunikacjiZApiException;
use App\Library\Api\Metody;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AdresyController
 * @package App\Controller
 * @Route("/adresy", name="adresy")
 */
class AdresyController extends AbstractController
{
    /**
     * @var Metody
     */
    private $api;

    /**
     * AdresyController constructor.
     * @param Metody $metodyApi
     */
    public function __construct(Metody $metodyApi)
    {
        $this->api = $metodyApi;
    }

    /**
     * @Route("/pobierz/wojewodztwa", name="wojewodztwa")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function wojewodztwa()
    {
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
