<?php

namespace Urbano;

use Symfony\Component\HttpFoundation\Response;

class View 
{
    private $response;

    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    public function render()
    {
        ob_start();
        echo $this->response->getContent();
        $view = ob_get_contents();
        ob_end_clean();
        echo $view;
    }

    public static function renderViewPageNotFound()
    {
        $data = [
            'errorCode' => 404,
            'message' => 'Page not found.'
        ];

        echo json_encode($data);
    }

    public static function renderViewError($message = '')
    {
        $data = [
            'errorCode' => 500,
            'message' => $message != '' ? $message : 'Servidor error.'
        ];
        echo json_encode($data);
    }

    
}