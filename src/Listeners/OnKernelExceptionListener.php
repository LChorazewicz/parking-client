<?php
/**
 * Created by PhpStorm.
 * User: leszek
 * Date: 30.01.19
 * Time: 22:29
 */

namespace App\Listeners;


use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;

class OnKernelExceptionListener
{
    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $odpowiedz = new RedirectResponse("/wystapil/blad");
        $event->setResponse($odpowiedz);
    }
}