<?php

namespace App\Controller;

use App\Entity\Wishcard;
use App\Repository\UserRepository;
use App\Repository\WishcardRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class WishcardController extends AbstractController
{
    #[Route('/api/wishcard', name: 'app_wishcard_create', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em): Response
    {

        $data = $request->getContent();
        $new = $serializer->deserialize($data, Wishcard::class, 'json');
        $errors = $validator->validate($new);
        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }
        $wishcard = new Wishcard;
        $wishcard->setTitle($new->getTitle());
        $wishcard->setDescription($new->getDescription());
        $wishcard->setUserid($this->getUser()->getId());
        $wishcard->setCreatedAt(new DateTime());
        // $wishcard->setDateLimit();

        $em->persist($wishcard);
        $em->flush();
        return $this->json($wishcard, 201, []);
    }

    #[Route('/api/wishcard/{id}', name: 'app_wishcard_modify', methods: ['PUT'])]
    public function modify($id, WishcardRepository $wishcard, Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        $wish = $wishcard->find($id);
        if ($wish !== null) {
            $data = $request->getContent();
            $new = $serializer->deserialize($data, Wishcard::class, 'json');
            $errors = $validator->validate($new);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }
            $wish->setTitle($new->getTitle());
            $wish->setDescription($new->getDescription());
        }

        return $this->json($wishcard, 201, []);
    }

    #[Route('/api/wishcard/{id}', name: 'app_wishcard_delete', methods: ['DELETE'])]
    public function delete($id, EntityManagerInterface $em, WishcardRepository $wishcard): Response
    {
        $wish = $wishcard->find($id);
        if ($wish !== null) {
            $info = [
                "message" => "La wishcard a été correctement supprimée"
            ];
            $em->remove($wishcard->find($id));
            $em->flush();
            return $this->json($info, 200, []);
        } else {
            $info = [
                "message" => "Cette wishcard n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route('/api/wishcard/me', name: 'app_wishcard_me', methods: ['GET'])]
    public function mycards(WishcardRepository $wishcard): Response
    {
        $wish = $wishcard->findBy(array("userid" => $this->getUser()->getId()));
        if ($wish !== null) {
            return $this->json($wish, 200, []);
        } else {
            $info = [
                "message" => "Vous n'avez pas de wishcard"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route('/api/wishcard/{id}', name: 'app_wishcard_info', methods: ['GET'])]
    public function info($id, WishcardRepository $wishcard): Response
    {
        $wish = $wishcard->find($id);
        if ($wish !== null) {
            return $this->json($wish, 200, []);
        } else {
            $info = [
                "message" => "Cette wishcard n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }
}
