<?php

namespace Urbano\Entity;

use Doctrine\Mapping\Entity;
use Doctrine\Mapping\Column;
use Doctrine\Mapping\Table;
use Doctrine\Mapping\ManyToOne;
use Doctrine\Mapping\JoinColumn;

/**
 * @Entity
 * @Table(name="cliente")
 */
class Cliente 
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

    /**
     * @Column(name="apellido", type="string", length=100, nullable=false)
     */
    private $apellido;

    /**
     * @Column(name="email", type="string", length=100, nullable=false)
     */
    private $email;

    /**
     * @Column(name="observaciones", type="text", nullable=true)
     */
    private $observaciones;

    /**
     * @ManyToOne(targetEntity="GrupoCliente")
     * @JoinColumn(name="grupo_cliente_id", referencedColumnName="id", nullable=false)
     */
    private $grupoCliente;

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

    public function setApellido($apellido)
    {
        $this->apellido = $apellido;
        return $this;
    }

    public function getApellido()
    {
        return $this->apellido;
    }

    public function setEmail($email)
    {
        $this->email = $email;
        return $this;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setObservaciones($observaciones)
    {
        $this->observaciones = $observaciones;
        return $this;
    }

    public function getObservaciones()
    {
        return $this->observaciones;
    }

    public function setGrupoCliente($grupoCliente)
    {
        $this->grupoCliente = $grupoCliente;
        return $this;
    }

    public function getGrupoCliente()
    {
        return $this->grupoCliente;
    }
}