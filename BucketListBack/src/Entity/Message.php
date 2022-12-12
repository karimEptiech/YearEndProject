<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank()]
    private $content;

    #[ORM\Column(type: 'integer')]
    private $senderid;

    #[ORM\Column(type: 'integer')]
    private $receiverid;

    #[ORM\Column(type: 'datetime')]
    private $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getSenderid(): ?int
    {
        return $this->senderid;
    }

    public function setSenderid(int $senderid): self
    {
        $this->senderid = $senderid;

        return $this;
    }

    public function getReceiverid(): ?int
    {
        return $this->receiverid;
    }

    public function setReceiverid(int $receiverid): self
    {
        $this->receiverid = $receiverid;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
