<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 23.01.19
 * Time: 23:01
 */

namespace App\DTO\Wniosek;


class WniosekApi
{
    /**
     * @var string
     */
    private $idWnioskuApi;

    /**
     * @var integer
     */
    private $status;

    /**
     * WniosekApi constructor.
     * @param array $dane
     */
    public function __construct($dane = [])
    {
        $this->idWnioskuApi = $dane['idWnioskuApi'];
        $this->status = $dane['status'];
    }

    /**
     * @return string
     */
    public function getIdWnioskuApi(): string
    {
        return $this->idWnioskuApi;
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }

    /**
     * @param string $idWnioskuApi
     * @return WniosekApi
     */
    public function setIdWnioskuApi(string $idWnioskuApi): WniosekApi
    {
        $this->idWnioskuApi = $idWnioskuApi;
        return $this;
    }

    /**
     * @param int $status
     * @return WniosekApi
     */
    public function setStatus(int $status): WniosekApi
    {
        $this->status = $status;
        return $this;
    }
}