<?php

namespace Urbano\Controller;

use Urbano\Entity\GrupoCliente;
use Symfony\Component\HttpFoundation\JsonResponse;

class GrupoClienteController extends Controller
{
    public function fetchAll()
    {
        $gruposClientes = $this
            ->em
            ->getRepository(GrupoCliente::class)
            ->findBy([], ['nombre' => 'ASC']);

        if (!$gruposClientes) {
            $data = [
                'data' => [],
                'status' => 'ok'
            ];    

            return new JsonResponse($data);
        }
        
        foreach($gruposClientes as $grupoCliente) {
            $data['data'][] = [
                'id' => $grupoCliente->getId(),
                'nombre' => $grupoCliente->getNombre(),
            ];
        }

        $data['status'] = 'ok';
         
        return new JsonResponse($data);
    }
}