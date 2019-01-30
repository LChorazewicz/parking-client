<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 30.01.19
 * Time: 11:59
 */

namespace App\Library\Api\Stale;


use Symfony\Component\HttpFoundation\Response;

/**
 * Class KodyOdpowiedzi
 * @package App\Library\Api\Stale
 */
class KodyOdpowiedzi
{
    /**
     * @return array
     */
    public static function pobierzKodyBledow()
    {
        return [
            Response::HTTP_BAD_REQUEST
        ];
    }
}