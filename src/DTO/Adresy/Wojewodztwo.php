<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 23.01.19
 * Time: 23:43
 */

namespace App\DTO\Adresy;


class Wojewodztwo
{
    /**
     * @var integer
     */
    public $id;

    /**
     * @var string
     */
    public $nazwa;

    /**
     * Wojewodztwa constructor.
     * @param array $dane
     */
    public function __construct(array $dane)
    {
        $this->id = $dane['id'];
        $this->nazwa = $dane['nazwa'];
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getNazwa(): string
    {
        return $this->nazwa;
    }
}