<?php

namespace Urbano;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Router
{
    const _FILE_CONFIG_ROUTING = 'config/routing.json';

    public $config;
    public $em;
    public $request;

    public function __construct()
    {
        $this->config = json_decode(file_get_contents(self::_FILE_CONFIG_ROUTING), true);
    }

    public function setEntityManager($em)
    {
        $this->em = $em;
    }

    public function setRequest(Request $request)
    {
        $this->request = $request;
    }

    public function resolve($route)
    {
        try {
            $isFound = false;
            foreach($this->config['routes'] as $item) {
                if ($route == $item['path']) {
                    if (!$this->request->isMethod($item['type'])) {
                        throw new \Exception("Method is invalid.");
                    }
                    $isFound = true;
                    $class = new $item['class'];
                    $class->setEntityManager($this->em);
                    $response = call_user_func_array(array($class, $item['method']), array($this->request));
                    $view = new View($response);
                    $view->render();
                } 
            }

            if (!$isFound) {
               View::renderViewPageNotFound();
            }
            
        } catch (\Exception $e) {
            View::renderViewError($e->getMessage());
        }
    }
}