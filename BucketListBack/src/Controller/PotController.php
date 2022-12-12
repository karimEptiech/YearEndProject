<?php

namespace App\Controller;

use App\Entity\Pot;
use App\Repository\PotRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class PotController extends AbstractController
{
    #[Route('/api/pot', name: 'app_pot_create', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $em): Response
    {
        $data = $request->getContent();
        $new = $serializer->deserialize($data, Pot::class, 'json');

        $pot = new Pot;
        $pot->setDescription($new->getDescription());
        $pot->setTotal($new->getTotal());
        $pot->setUserid($this->getUser()->getId());
        $pot->setWishcardid($new->getWishcardid());
        $em->persist($pot);
        $em->flush();

        return $this->json($pot, 201, []);
    }

    #[Route('/api/pot', name: 'app_pot_info', methods: ['GET'])]
    public function info(PotRepository $potRepository): Response
    {
        $pot = $potRepository->findBy(array("userid" => $this->getUser()->getId()));
        if ($pot !== null || $pot !== []) {
            return $this->json($pot, 200, []);
        } else {
            $info = [
                "message" => "Vous n'avez fait aucun dons"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route('/api/pot/somme/{id}', name: 'app_pot_total', methods: ['GET'])]
    public function total($id, PotRepository $potRepository): Response
    {
        $pot = $potRepository->findBy(array("wishcardid" => $id));
        if ($pot !== null || $pot !== []) {
            $total = 0;
            for ($i = 0; $i < count($pot); $i++) {
                $total += $pot[$i]->getTotal();
            }
            return $this->json($total, 200, []);
        } else {
            $info = [
                "message" => "Il n'y a aucun don pour cette wishcard"
            ];
            return $this->json($info, 404, []);
        }
    }
}
