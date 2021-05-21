<?php

namespace Urbano;

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;

 class UrbanoBoostrap
 {
    const _FILE_CONFIG_DATABASE = 'config/database.json';

    private $dbParams;
    private $em;
    private $request;

    public function __construct()
    {        
        $this->dbParams = json_decode(file_get_contents(self::_FILE_CONFIG_DATABASE), true);
    }

    public function init()
    {
        $this->createEntityManager();
        $this->initRequest();

        $router = new Router();
        $router->setEntityManager($this->em);
        $router->setRequest($this->request);
        $router->resolve($this->request->getPathInfo());
    }

    public function createEntityManager()
    {
        $paths = array("/src/Entity");
        $isDevMode = false;
        $config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);
        $config->setAutoGenerateProxyClasses(true);
        $this->em = EntityManager::create($this->dbParams, $config);
    }

    public function initRequest()
    {
        $this->request = Request::createFromGlobals();
    }
 }