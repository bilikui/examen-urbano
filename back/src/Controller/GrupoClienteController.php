<?php

namespace Urbano\Controller;

use Urbano\Entity\GrupoCliente;
use Symfony\Component\HttpFoundation\Request;
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

    public function save(Request $request)
    {
        $id = $request->get('id');
        $id = ($id == '') ? null : $id;
        $nombre = $request->get('nombre');
        $data = [];
        try {
        
            if (empty($nombre)) {
                throw new \Exception('El nombre es obligatorio.');
            }
        
            $grupoCliente = new GrupoCliente();
            if (!empty($id)) {
                // Modificaciones
                $grupoCliente = $this->em->getRepository(GrupoCliente::class)->find($id);
            }
        
            $grupoCliente->setNombre($nombre);

            $this->em->persist($grupoCliente);
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
        $grupoCliente = $this->em->getRepository(GrupoCliente::class)->find($id);
        if (!$grupoCliente) {
            $data = [
                'data' => [],
                'status' => 'ok'
            ];    
            return new JsonResponse($data);           
        }

        $data['data'] = [
            'id' => $grupoCliente->getId(),
            'nombre' => $grupoCliente->getNombre()
        ];

        $data['status'] = 'ok';
        return new JsonResponse($data);
    }

    public function delete(Request $request)
    {
        $id = $request->get('id');
        $grupoCliente = $this->em->getRepository(GrupoCliente::class)->find($id);
        if (!$grupoCliente) {
            $data = [
                'data' => [],
                'status' => 'ok'
            ];    
            return new JsonResponse($data);          
        }

        try {
            
            $this->em->remove($grupoCliente);
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

        $gruposClientes = $this
            ->em
            ->getRepository(GrupoCliente::class)
            ->createQueryBuilder('gc')
            ->where('gc.' . $field . ' LIKE :search')
            ->setParameter('search', '%' . $search . '%')
            ->getQuery()
            ->getResult();

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