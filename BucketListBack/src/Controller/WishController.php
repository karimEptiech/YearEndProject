<?php

namespace App\Controller;

use App\Entity\Wishcard;
use App\Repository\WishcardRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class WishController extends AbstractController
{
    #[Route('/api/wish/{id}', name: 'app_wish_create', methods: ['POST'])]
    public function create($id, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, WishcardRepository $wishcardRepository): Response
    {
        $data = $request->getContent();
        $new = $serializer->deserialize($data, Wishcard::class, 'json');
        $wishcard = $wishcardRepository->find($id);

        $list = $wishcard->getList();

        if ($wishcard !== null && $new->getList() !== null) {
            for ($i = 0; $i < count($new->getList()); $i++) {
                array_push($list, $new->getList()[$i]);
            }

            $wishcard->setList($list);
            $em->persist($wishcard);
            $em->flush();
            return $this->json($wishcard, 201, []);
        } else {
            $info = [
                "message" => "La wishcard n'existe pas ou alors vous n'avez pas ajouté de nouveau voeux"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route('/api/wish/{id}', name: 'app_wish_info', methods: ['GET'])]
    public function info($id, WishcardRepository $wishcardRepository): Response
    {

        $wishcard = $wishcardRepository->find($id);
        if ($wishcard !== null) {
            return $this->json($wishcard->getList(), 200, []);
        } else {
            $info = [
                "message" => "La wishcard n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route('/api/wish/{id}', name: 'app_wish_delete', methods: ['DELETE'])]
    public function delete($id, WishcardRepository $wishcardRepository, EntityManagerInterface $em): Response
    {
        $wishcard = $wishcardRepository->find($id);
        if ($wishcard !== null) {
            $wishcard->setList([]);
            $em->persist($wishcard);
            $em->flush();
            return $this->json($wishcard, 200, []);
        } else {
            $info = [
                "message" => "La wishcard n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route('/api/wish/{id}', name: 'app_wish_modify', methods: ['PUT'])]
    public function modify($id, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, WishcardRepository $wishcardRepository): Response
    {

        $data = $request->getContent();
        $new = $serializer->deserialize($data, Wishcard::class, 'json');
        $wishcard = $wishcardRepository->find($id);
        if ($wishcard !== null && $new->getList() !== null) {

            $wishcard->setList($new->getList());
            $em->persist($wishcard);
            $em->flush();
            return $this->json($wishcard, 200, []);
        } else {
            $info = [
                "message" => "La wishcard n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }
}
