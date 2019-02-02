<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 02.02.19
 * Time: 14:20
 */

namespace App\Listeners;

class OpoznijMnie
{
    /**
     * @var int
     */
    private $naIle;

    /**
     * @param int $naIle
     */
    public function naIleSekund($naIle = 1)
    {
        $this->naIle = $naIle;
    }

    /**
     * @return int
     */
    public function opoznij()
    {
        return sleep($this->naIle);
    }
}