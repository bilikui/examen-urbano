<?php

namespace Urbano\Controller;

use Urbano\Entity\Cliente;
use Urbano\Entity\GrupoCliente;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ClienteController extends Controller
{
    public function fetchAll()
    {
        $clientes = $this->em->getRepository(Cliente::class)->findAll();

        if (!$clientes) {
            $data = [
                'data' => [],
                'status' => 'ok'
            ];    

            return new JsonResponse($data);
        }
        
        foreach($clientes as $cliente) {
            $data['data'][] = [
                'id' => $cliente->getId(),
                'nombre' => $cliente->getNombre(),
                'apellido' => $cliente->getApellido(),
                'email' => $cliente->getEmail(),
                'observaciones' => $cliente->getObservaciones(),
                'grupoCliente' => $cliente->getGrupoCliente()->getNombre()
            ];
        }

        $data['status'] = 'ok';
         
        return new JsonResponse($data);
    }

    public function save(Request $request)
    {
        $id = $request->get('id');
        $id = ($id == '') ? null : $id;
        $nombre = $request->get('nombre');
        $apellido = $request->get('apellido');
        $email = $request->get('email');
        $grupoClienteId = $request->get('grupoCliente');
        $observaciones = $request->get('observaciones');
        $data = [];

        if (empty($nombre)) {
            throw new \Exception('El nombre es obligatorio.');
        }
        
        if (empty($apellido)) {
            throw new \Exception('El apellido es obligatorio.');
        }

        if (empty($email)) {
            throw new \Exception('El email es obligatorio.');
        }

        if (empty($grupoClienteId)) {
            throw new \Exception('El grupo de clientes es obligatorio.');
        }

        try {
            $cliente = new Cliente();
            if ($id !== null) {
                $cliente = $this->em->getRepository(Cliente::class)->find($id);
            }
            
            $cliente
                ->setNombre($nombre)
                ->setApellido($apellido)
                ->setEmail($email)
                ->setGrupoCliente($this->em->getRepository(GrupoCliente::class)->find($grupoClienteId))
                ->setObservaciones($observaciones);

            $this->em->persist($cliente);
            $this->em->flush();

            $data = ['status' => 'ok'];   
            
        } catch(\Exception $e) {
            $data = ['status' => 'nok', 'error' => $e->getMessage()];
        }

        return new JsonResponse($data);
    }
}