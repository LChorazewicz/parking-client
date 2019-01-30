<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 27.01.19
 * Time: 23:41
 */

namespace App\Model;


use App\DTO\Wniosek\WniosekApi;
use App\Library\Api\Stale\StatusyWnioskuApi;
use App\Library\KrokiStale;

class Wniosek
{
    /**
     * @param WniosekApi $wniosekApi
     * @param string $nazwaKroku
     * @return bool
     * @throws \Exception
     */
    public function czyKlientZamierzaWejscNaWlasciwyKrok(WniosekApi $wniosekApi, string $nazwaKroku)
    {
        $czyWlasciwy = false;
        switch ($nazwaKroku){
            case KrokiStale::CZY_MOGE_PRZEJSC_NA_KROK_3:{
                if(in_array($wniosekApi->getStatus(), StatusyWnioskuApi::pobierzStatusyWnioskuDlaKroku(KrokiStale::CZY_MOGE_PRZEJSC_NA_KROK_3))){
                    $czyWlasciwy = true;
                }
                break;
            }
            case KrokiStale::CZY_MOGE_PRZEJSC_NA_KROK_2:{
                if(in_array($wniosekApi->getStatus(), StatusyWnioskuApi::pobierzStatusyWnioskuDlaKroku(KrokiStale::CZY_MOGE_PRZEJSC_NA_KROK_2))){
                    $czyWlasciwy = true;
                }
                break;
            }
            case KrokiStale::CZY_MOGE_PRZEJSC_NA_PODSUMOWANIE:{
                if(in_array($wniosekApi->getStatus(), StatusyWnioskuApi::pobierzStatusyWnioskuDlaKroku(KrokiStale::CZY_MOGE_PRZEJSC_NA_PODSUMOWANIE))){
                    $czyWlasciwy = true;
                }
                break;
            }
            case KrokiStale::KROK_1:{
                if(in_array($wniosekApi->getStatus(), StatusyWnioskuApi::pobierzStatusyWnioskuDlaKroku(KrokiStale::KROK_1))){
                    $czyWlasciwy = true;
                }
                break;
            }
            case KrokiStale::KROK_2:{
                if(in_array($wniosekApi->getStatus(), StatusyWnioskuApi::pobierzStatusyWnioskuDlaKroku(KrokiStale::KROK_2))){
                    $czyWlasciwy = true;
                }
                break;
            }
            case KrokiStale::KROK_3:{
                if(in_array($wniosekApi->getStatus(), StatusyWnioskuApi::pobierzStatusyWnioskuDlaKroku(KrokiStale::KROK_3))){
                    $czyWlasciwy = true;
                }
                break;
            }
            case KrokiStale::PODSUMOWANIE:{
                if(in_array($wniosekApi->getStatus(), StatusyWnioskuApi::pobierzStatusyWnioskuDlaKroku(KrokiStale::PODSUMOWANIE))){
                    $czyWlasciwy = true;
                }
                break;
            }
        }
        return $czyWlasciwy;
    }

    /**
     * @param int $status
     * @return bool
     * @throws \Exception
     */
    public function ustalWlasciwyKrokDlaKlienta(int $status)
    {
        $wlasciwyKrok = "";
        switch ($status){
            case StatusyWnioskuApi::WNIOSEK_KROK_1:{
                $wlasciwyKrok = KrokiStale::KROK_1;
                break;
            }
            case StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_1:{
                $wlasciwyKrok = KrokiStale::KROK_2;
                break;
            }
            case StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_1:{
                $wlasciwyKrok = KrokiStale::KROK_1;
                break;
            }
            case StatusyWnioskuApi::WNIOSEK_KROK_2:{
                $wlasciwyKrok = KrokiStale::KROK_2;
                break;
            }
            case StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_2:{
                $wlasciwyKrok = KrokiStale::KROK_2;
                break;
            }
            case StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_2:{
                $wlasciwyKrok = KrokiStale::KROK_2;
                break;
            }
            case StatusyWnioskuApi::WNIOSEK_KROK_3:{
                $wlasciwyKrok = KrokiStale::KROK_3;
                break;
            }
            case StatusyWnioskuApi::WNIOSEK_WALIDACJA_POPRAWNA_KROK_3:{
                $wlasciwyKrok = KrokiStale::PODSUMOWANIE;
                break;
            }
            case StatusyWnioskuApi::WNIOSEK_BLAD_WALIDACJI_KROK_3:{
                $wlasciwyKrok = KrokiStale::KROK_3;
                break;
            }
            case StatusyWnioskuApi::WNIOSEK_PODSUMOWANIE:{
                $wlasciwyKrok = KrokiStale::PODSUMOWANIE;
                break;
            }
            case StatusyWnioskuApi::WNIOSEK_PRZETERMINOWANY:{
                $wlasciwyKrok = KrokiStale::KROK_1;
                break;
            }
            default:
                throw new \Exception("Wybrany krok nie istnieje");
        }
        return '/' . $wlasciwyKrok;
    }
}