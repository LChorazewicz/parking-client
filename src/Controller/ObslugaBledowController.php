<?php

namespace App\Controller;

use App\Library\Sesja;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ObslugaBledowController extends AbstractController
{
    /**
     * @Route("/obsluga/bledow", name="obsluga_bledow")
     * @Route("/wystapil/blad", name="wystapil_blad")
     * @param Sesja $session
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index(Sesja $session)
    {
        return $this->render('obsluga_bledow/index.html.twig', [
            'kod_bledu' => $session->pobierz('kod_bledu', 'OxOOOOOOOOO1'),
            'id_wniosku_api' => $session->pobierz('idWnioskuApi', "uwu-wledknla-danlk-j38-adsnd"),
            'host' => $this->getParameter("domena")//todo: wyniesc do parametrow
        ]);
    }
}
