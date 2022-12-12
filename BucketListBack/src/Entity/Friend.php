<?php

namespace App\Entity;

use App\Repository\FriendRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FriendRepository::class)]
class Friend
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer')]
    private $currentuserid;

    #[ORM\Column(type: 'integer')]
    private $friendid;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCurrentuserid(): ?int
    {
        return $this->currentuserid;
    }

    public function setCurrentuserid(int $currentuserid): self
    {
        $this->currentuserid = $currentuserid;

        return $this;
    }

    public function getFriendid(): ?int
    {
        return $this->friendid;
    }

    public function setFriendid(int $friendid): self
    {
        $this->friendid = $friendid;

        return $this;
    }
}
