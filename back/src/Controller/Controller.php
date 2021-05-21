<?php

namespace Urbano\Controller;

class Controller 
{
    protected $em;
   
    public function setEntityManager($em)
    {
        $this->em = $em;
    }
}