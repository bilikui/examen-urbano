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
                'grupoCliente' => [
                    'id' => $cliente->getGrupoCliente()->getId(),
                    'nombre' => $cliente->getGrupoCliente()->getNombre(),
                ]
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
        $grupoCliente = $request->get('grupoCliente');
        $observaciones = $request->get('observaciones');
        $data = [];

        try {
        
            if (empty($nombre)) {
                throw new \Exception('El nombre es obligatorio.');
            }
        
            if (empty($apellido)) {
                throw new \Exception('El apellido es obligatorio.');
            }

            if (empty($email)) {
                throw new \Exception('El email es obligatorio.');
            }

            if (empty($grupoCliente)) {
                throw new \Exception('El grupo de clientes es obligatorio.');
            }

            $cliente = new Cliente();
            if (!empty($id)) {
                // Modificaciones
                $cliente = $this->em->getRepository(Cliente::class)->find($id);
                $grupoCliente = $grupoCliente['id'];
            }
        
            $cliente
                ->setNombre($nombre)
                ->setApellido($apellido)
                ->setEmail($email)
                ->setGrupoCliente($this->em->getRepository(GrupoCliente::class)->find($grupoCliente))
                ->setObservaciones($observaciones);

            $this->em->persist($cliente);
            $this->em->flush();

            $data = ['status' => 'ok'];   
            
        } catch(\Exception $e) {
            $data = ['status' => 'nok', 'error' => $e->getMessage()];
        }

        return new JsonResponse($data);
    }

    public function find(Request $request)
    {
        $id = $request->get('id');
        $cliente = $this->em->getRepository(Cliente::class)->find($id);

        if (!$cliente) {
            $data = [
                'data' => [],
                'status' => 'ok'
            ];    
            return new JsonResponse($data);           
        }

        $data['data'] = [
            'id' => $cliente->getId(),
            'nombre' => $cliente->getNombre(),
            'apellido' => $cliente->getApellido(),
            'email' => $cliente->getEmail(),
            'observaciones' => $cliente->getObservaciones(),
            'grupoCliente' => [
                'id' => $cliente->getGrupoCliente()->getId(),
                'nombre' => $cliente->getGrupoCliente()->getNombre(),
            ]
        ];

        $data['status'] = 'ok';

        return new JsonResponse($data);
    }

    public function delete(Request $request)
    {
        $id = $request->get('id');
        $cliente = $this->em->getRepository(Cliente::class)->find($id);

        if (!$cliente) {
            $data = [
                'data' => [],
                'status' => 'ok'
            ];    
            return new JsonResponse($data);          
        }

        try {
            
            $this->em->remove($cliente);
            $this->em->flush();

            $data['status'] = 'ok';

        } catch(\Exception $e) {
            $data = ['status' => 'nok', 'error' => $e->getMessage()];
        }

        return new JsonResponse($data);
    }

    public function search(Request $request)
    {
        $field = $request->get('field');
        $search = $request->get('search');
        
        $query = $this
            ->em
            ->getRepository(Cliente::class)
            ->createQueryBuilder('c');
            

        if ($field == 'grupoCliente') {
            $query
                ->join('c.grupoCliente', 'gc')
                ->where('gc.nombre LIKE :search');
        } else {
            $query->where('c.' . $field . ' LIKE :search');
        }

        $clientes = $query 
            ->setParameter('search', '%' . $search . '%')
            ->getQuery()
            ->getResult();
            
        foreach($clientes as $cliente) {
            $data['data'][] = [
                'id' => $cliente->getId(),
                'nombre' => $cliente->getNombre(),
                'apellido' => $cliente->getApellido(),
                'email' => $cliente->getEmail(),
                'observaciones' => $cliente->getObservaciones(),
                'grupoCliente' => [
                    'id' => $cliente->getGrupoCliente()->getId(),
                    'nombre' => $cliente->getGrupoCliente()->getNombre(),
                ]
            ];
        }
        $data['status'] = 'ok';
            
        return new JsonResponse($data);
    }
}