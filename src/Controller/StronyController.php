<?php

namespace App\Controller;

use App\Exceptions\WystapilBladWKomunikacjiZApiException;
use App\Library\Api\Metody;
use App\Library\Api\Stale\StatusyWnioskuApi;
use App\Library\Generator;
use App\Library\KrokiStale;
use App\Library\Sesja;
use App\Model\Wniosek;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class StronyController
 * @package App\Controller
 */
class StronyController extends AbstractController
{
    /**
     * @var Sesja
     */
    private $sesja;

    /**
     * @var Metody
     */
    private $metodyApi;

    /**
     * @var Wniosek
     */
    private $wniosekModel;

    /**
     * StronyController constructor.
     * @param Sesja $sesja
     * @param Metody $metody
     * @param Wniosek $wniosek
     * @throws WystapilBladWKomunikacjiZApiException
     * @throws \App\Exceptions\WprowadzoneDaneSaNieprawidloweException
     */
    public function __construct(Sesja $sesja, Metody $metody, Wniosek $wniosek)
    {
        $this->sesja = $sesja;
        $this->metodyApi = $metody;
        $this->wniosekModel = $wniosek;

        if(!$this->sesja->czySesjaApiZostalaZainicjowana()){
            $this->sesja->rozpocznijSesjeApi();
        }else if($this->sesja->czySesjaApiZostalaZainicjowana() && $this->metodyApi->czyWymusicRestartSesji($sesja->pobierz("idWnioskuApi"))){
            $this->sesja->restartujSesjeApi();
        }else{
            $this->sesja->odswiezSesjeApi();
        }
        $this->metodyApi->ustawWniosek($sesja->pobierzWniosekApi());
        if($sesja->pobierz("kod_bledu") !== null){
            $sesja->usunZmiennaZSesji("kod_bledu");
        }
    }

    /**
     * @Route("/", name="glowna")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @throws \Exception
     */
    public function glowna()
    {
        return $this->redirectToRoute("krok-1");
    }

    /**
     * @Route("/krok-1", name="krok-1")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function krok1(Request $request)
    {
        try{
            if($this->sesja->pobierzWniosekApi()->getStatus() === StatusyWnioskuApi::WNIOSEK_PODSUMOWANIE){
                $this->sesja->restartujSesjeApi();
                return $this->redirect(KrokiStale::KROK_1);
            }

            if(!$this->wniosekModel->czyKlientZamierzaWejscNaWlasciwyKrok($this->sesja->pobierzWniosekApi(), $request->get("_route"))){
                return $this->redirect($this->wniosekModel->ustalWlasciwyKrokDlaKlienta($this->sesja->pobierzWniosekApi()->getStatus()));
            }

            if(!in_array($this->sesja->pobierzWniosekApi()->getStatus(), [
                StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_1,
                StatusyWnioskuApi::WNIOSEK_KROK_1
            ])){
                $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_KROK_1, []);
                $this->sesja->odswiezSesjeApi();
            }
            var_dump($this->sesja->pobierzWniosekApi());
            var_dump($this->sesja->pobierzSesje());
        }catch (\Exception $e){
            $this->sesja->ustaw("kod_bledu", Generator::generujIdBledu());
            return $this->redirect("/obsluga/bledow");
        }

        return $this->render('strony/krok1.html.twig', [
            'nazwa_kroku' => 'krok 1',
            'numer_kroku' => 1,
            'api_key' => $this->sesja->pobierz("idWnioskuApi"),
            'strona_bledu' => $this->getParameter("domena") . '/wystapil/blad',
        ]);
    }

    /**
     * @Route("/krok-2", name="krok-2")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function krok2(Request $request)
    {
        try{
            if(!$this->wniosekModel->czyKlientZamierzaWejscNaWlasciwyKrok($this->sesja->pobierzWniosekApi(), $request->get("_route"))){
                return $this->redirect($this->wniosekModel->ustalWlasciwyKrokDlaKlienta($this->sesja->pobierzWniosekApi()->getStatus()));
            }

            if(in_array($this->sesja->pobierzWniosekApi()->getStatus(), [StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_1])){
                $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_KROK_2, []);
                $this->sesja->odswiezSesjeApi();
            }

            var_dump($this->sesja->pobierzWniosekApi());
            var_dump($this->sesja->pobierzSesje());
        }catch (\Exception $e){
            $this->sesja->ustaw("kod_bledu", Generator::generujIdBledu());
            return $this->redirect("/obsluga/bledow");
        }

        return $this->render('strony/krok2.html.twig', [
            'nazwa_kroku' => 'krok 2',
            'numer_kroku' => 2,
            'api_key' => $this->sesja->pobierz("idWnioskuApi"),
            'strona_bledu' => $this->getParameter("domena") . '/wystapil/blad'
        ]);
    }

    /**
     * @Route("/krok-3", name="krok-3")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function krok3(Request $request)
    {
        try{
            if(!$this->wniosekModel->czyKlientZamierzaWejscNaWlasciwyKrok($this->sesja->pobierzWniosekApi(), $request->get("_route"))){
                return $this->redirect($this->wniosekModel->ustalWlasciwyKrokDlaKlienta($this->sesja->pobierzWniosekApi()->getStatus()));
            }

            if(in_array($this->sesja->pobierzWniosekApi()->getStatus(), [StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_2])){
                $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_KROK_3, []);
                $this->sesja->odswiezSesjeApi();
            }

            var_dump($this->sesja->pobierzWniosekApi());
            var_dump($this->sesja->pobierzSesje());

        }catch (\Exception $e){
            $this->sesja->ustaw("kod_bledu", Generator::generujIdBledu());
            return $this->redirect("/obsluga/bledow");
        }
        return $this->render('strony/krok3.html.twig', [
            'nazwa_kroku' => 'krok 3',
            'numer_kroku' => 3,
            'api_key' => $this->sesja->pobierz("idWnioskuApi"),
            'strona_bledu' => $this->getParameter("domena") . '/wystapil/blad'
        ]);
    }

    /**
     * @Route("/podsumowanie", name="podsumowanie")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function podsumowanie(Request $request)
    {
        try{
            if(!$this->wniosekModel->czyKlientZamierzaWejscNaWlasciwyKrok($this->sesja->pobierzWniosekApi(), $request->get("_route"))){
                return $this->redirect($this->wniosekModel->ustalWlasciwyKrokDlaKlienta($this->sesja->pobierzWniosekApi()->getStatus()));
            }

            if(in_array($this->sesja->pobierzWniosekApi()->getStatus(), [StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_3])){
                $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_PODSUMOWANIE, []);
                $this->sesja->odswiezSesjeApi();
            }

            var_dump($this->sesja->pobierzWniosekApi());
            var_dump($this->sesja->pobierzSesje());

        }catch (\Exception $e){
            $this->sesja->ustaw("kod_bledu", Generator::generujIdBledu());
            return $this->redirect("/obsluga/bledow");
        }
        return $this->render('strony/podsumowanie.html.twig', [
            'nazwa_kroku' => 'podsumowanie',
            'numer_kroku' => 4,
            'api_key' => $this->sesja->pobierz("idWnioskuApi"),
            'strona_bledu' => $this->getParameter("domena") . '/wystapil/blad'
        ]);
    }

    /**
     * @Route("/czy-moge-przejsc-na-krok-2", name="czy-moge-przejsc-na-krok-2")
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function czyMogePrzejscNaKrok2(Request $request)
    {
        try{
            if(!$this->wniosekModel->czyKlientZamierzaWejscNaWlasciwyKrok($this->sesja->pobierzWniosekApi(), $request->get("_route"))){
                return $this->redirect($this->wniosekModel->ustalWlasciwyKrokDlaKlienta($this->sesja->pobierzWniosekApi()->getStatus()));
            }
            $daty = $request->request->get("daty", null);
            $suma = $request->request->get("sumaKontrolna", null);

            if($suma !== "0-0-0" && $suma !== "" && $suma !== null){
                $czyMoge = (bool)$this->metodyApi->sprawdzSumeKontrolna($suma);
                if($czyMoge){
                    $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_1, [
                        'suma_kontrolna' => $suma
                    ]);
                    return $this->redirect("/krok-2");
                }else{
                    $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_1, [
                        'suma_kontrolna' => $suma
                    ]);
                    return $this->redirect("/krok-1");
                }
            }else{
                $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_1, [
                    'suma_kontrolna' => $suma
                ]);
                return $this->redirect("/krok-1");
            }
        }catch (\Exception $e){
            $this->sesja->ustaw("kod_bledu", Generator::generujIdBledu());
            return $this->redirect("/obsluga/bledow");
        }
    }

    /**
     * @Route("/czy-moge-przejsc-na-krok-3", name="czy-moge-przejsc-na-krok-3")
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function czyMogePrzejscNaKrok3(Request $request)
    {
        try{
            if(!$this->wniosekModel->czyKlientZamierzaWejscNaWlasciwyKrok($this->sesja->pobierzWniosekApi(), $request->get("_route"))){
                return $this->redirect($this->wniosekModel->ustalWlasciwyKrokDlaKlienta($this->sesja->pobierzWniosekApi()->getStatus()));
            }

            $imie = $request->request->get("imie", null);
            $nazwisko = $request->request->get("nazwisko", null);
            $telefon = $request->request->get("telefon", null);
            $numerRejestracyjny = $request->request->get("numer_rejestracyjny", null);

            $zgody = [
                ['id' => 1, 'wartosc' => $request->request->get("zgoda_1", null) === 'on' ? 1 : 0],
                ['id' => 2, 'wartosc' => $request->request->get("zgoda_2", null) === 'on' ? 1 : 0],
                ['id' => 3, 'wartosc' => $request->request->get("zgoda_3", null) === 'on' ? 1 : 0],
                ['id' => 4, 'wartosc' => $request->request->get("zgoda_4", null) === 'on' ? 1 : 0]
            ];

            $czyMoge = $this->metodyApi->sprawdzZgody($zgody);
            if($czyMoge){
                $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_2, [
                    'imie' => $imie,
                    'nazwisko' => $nazwisko,
                    'numerTelefonu' => $telefon,
                    'numerRejestracyjny' => $numerRejestracyjny,
                    'zgody' => $zgody
                ]);
                return $this->redirect("/krok-3");
            }else{
                $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_2, []);
                return $this->redirect("/krok-2");
            }
        }catch (\Exception $e){
            $this->sesja->ustaw("kod_bledu", Generator::generujIdBledu());
            return $this->redirect("/obsluga/bledow");
        }

    }

    /**
     * @Route("/czy-moge-przejsc-na-podsumowanie", name="czy-moge-przejsc-na-podsumowanie")
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function czyMogePrzejscNaPodsumowanie(Request $request)
    {
        try{
            if(!$this->wniosekModel->czyKlientZamierzaWejscNaWlasciwyKrok($this->sesja->pobierzWniosekApi(), $request->get("_route"))){
                return $this->redirect($this->wniosekModel->ustalWlasciwyKrokDlaKlienta($this->sesja->pobierzWniosekApi()->getStatus()));
            }

            $kodSms = $request->request->get("kod-sms", null);

            if($kodSms !== null){
                $czyMoge = $this->metodyApi->sprawdzKodSms($kodSms);
                if($czyMoge){
                    $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_3, []);
                    return $this->redirect("/podsumowanie");
                }else{
                    $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_3, []);
                    return $this->redirect("/krok-3");
                }
            }else{
                $this->metodyApi->aktualizujWniosek($this->sesja->pobierzWniosekApi(), StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_3, []);
                return $this->redirect("/krok-3");
            }
        }catch (\Exception $e){
            $this->sesja->ustaw("kod_bledu", Generator::generujIdBledu());
            return $this->redirect("/obsluga/bledow");
        }
    }
}
