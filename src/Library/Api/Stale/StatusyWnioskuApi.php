<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 27.01.19
 * Time: 22:56
 */

namespace App\Library\Api\Stale;

use App\Library\KrokiStale;

class StatusyWnioskuApi
{
    public const WNIOSEK_KROK_1 = 10;

    public const WNIOSEK_BLAD_WALIDACJI_KROK_1 = 11;

    public const WNIOSEK_WALIDACJA_POPRAWNA_KROK_1 = 12;

    public const WNIOSEK_KROK_2 = 20;

    public const WNIOSEK_BLAD_WALIDACJI_KROK_2 = 21;

    public const WNIOSEK_WALIDACJA_POPRAWNA_KROK_2 = 22;

    public const WNIOSEK_KROK_3 = 30;

    public const WNIOSEK_BLAD_WALIDACJI_KROK_3 = 31;

    public const WNIOSEK_WALIDACJA_POPRAWNA_KROK_3 = 32;

    public const WNIOSEK_PODSUMOWANIE = 40;

    public const WNIOSEK_BLAD_WALIDACJI_PODSUMOWANIE = 41;

    public const WNIOSEK_WALIDACJA_POPRAWNA_PODSUMOWANIE = 42;

    public const WNIOSEK_PRZETERMINOWANY = 50;

    /**
     * @param string $krok
     * @return array
     * @throws \Exception
     */
    public static function pobierzStatusyWnioskuDlaKroku(string $krok)
    {
        $odpowiedz = [];
        switch ($krok){
            case KrokiStale::KROK_1:{
                $odpowiedz = [self::WNIOSEK_KROK_1, self::WNIOSEK_BLAD_WALIDACJI_KROK_1];
                break;
            }
            case KrokiStale::CZY_MOGE_PRZEJSC_NA_KROK_2:{
                    $odpowiedz = [self::WNIOSEK_KROK_1, self::WNIOSEK_WALIDACJA_POPRAWNA_KROK_1, self::WNIOSEK_BLAD_WALIDACJI_KROK_1];
                break;
            }
            case KrokiStale::CZY_MOGE_PRZEJSC_NA_KROK_3:{
                $odpowiedz = [self::WNIOSEK_KROK_2, self::WNIOSEK_BLAD_WALIDACJI_KROK_2];
                break;
            }
            case KrokiStale::KROK_2:{
                $odpowiedz = [self::WNIOSEK_KROK_2, self::WNIOSEK_BLAD_WALIDACJI_KROK_2, self::WNIOSEK_WALIDACJA_POPRAWNA_KROK_1];
                break;
            }
            case KrokiStale::KROK_3:{
                $odpowiedz = [self::WNIOSEK_KROK_3, self::WNIOSEK_WALIDACJA_POPRAWNA_KROK_2, self::WNIOSEK_WALIDACJA_POPRAWNA_KROK_3, self::WNIOSEK_BLAD_WALIDACJI_KROK_3];
                break;
            }
            case KrokiStale::PODSUMOWANIE:{
                $odpowiedz = [self::WNIOSEK_WALIDACJA_POPRAWNA_KROK_3, self::WNIOSEK_PODSUMOWANIE];
                break;
            }
            case KrokiStale::CZY_MOGE_PRZEJSC_NA_PODSUMOWANIE:{
                $odpowiedz = [self::WNIOSEK_BLAD_WALIDACJI_KROK_3, self::WNIOSEK_KROK_3];
                break;
            }
            default:
                throw new \Exception("Krok " . $krok . " nie istnieje");
        }
        return $odpowiedz;
    }

}