<?php

namespace App\Controller;

use App\Exceptions\WprowadzoneDaneSaNieprawidloweException;
use App\Exceptions\WystapilBladWKomunikacjiZApiException;
use App\Library\Api\Metody;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class SprawdzController
 * @package App\Controller
 * @Route("/sprawdz", name="sprawdz")
 */
class SprawdzController extends AbstractController
{
    /**
     * @var Metody
     */
    private $api;

    /**
     * SprawdzController constructor.
     */
    public function __construct(Metody $metody)
    {
        $this->api = $metody;
    }

    /**
     * @Route("/kod-sms/{kodSms}", name="kod-sms")
     * @param $kodSms
     * @return JsonResponse
     */
    public function kodsms($kodSms)
    {
        try {
            $odpowidz = ['status' => $this->api->sprawdzKodSms($kodSms)];
        } catch (WprowadzoneDaneSaNieprawidloweException $e) {
            $odpowidz = ['blad' => true];
        } catch (WystapilBladWKomunikacjiZApiException $e) {
            $odpowidz = ['blad' => true];
        }
        return new JsonResponse($odpowidz);
    }
}
