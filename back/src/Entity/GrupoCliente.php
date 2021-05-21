<?php

namespace Urbano\Entity;

use Doctrine\Mapping\Entity;
use Doctrine\Mapping\Column;
use Doctrine\Mapping\Table;

/**
 * @Entity
 * @Table(name="grupo_cliente")
 */
class GrupoCliente 
{
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue
     */
    private $id;

    /**
     * @Column(name="nombre", type="string", length=100, nullable=false)
     */
    private $nombre;

    public function getId()
    {
        return $this->id;
    }

    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
        return $this;
    }

    public function getNombre()
    {
        return $this->nombre;
    }
}
