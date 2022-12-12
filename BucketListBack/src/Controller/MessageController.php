<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class MessageController extends AbstractController
{
    #[Route('/api/message/{id}', name: 'app_message_create', methods: ['POST'])]
    public function create($id, Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em, UserRepository $userRepository): Response
    {
        $data = $request->getContent();
        $new = $serializer->deserialize($data, Message::class, 'json');
        $errors = $validator->validate($new);
        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }
        $user = $userRepository->find($id);
        if ($user !== null) {
            $message = new Message;
            $message->setContent($new->getContent());
            $message->setReceiverid($id);
            $message->setSenderid($this->getUser()->getId());
            $message->setCreatedAt(new DateTime());

            $em->persist($message);
            $em->flush();
            return $this->json($message, 201, []);
        } else {
            $info = [
                "message" => "L'utilisateur à qui vous souhaitez envoyer un message n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route('/api/message/{id}', name: 'app_message_info', methods: ['GET'])]
    public function info($id, MessageRepository $messageRepository): Response
    {
        $mymessage = $messageRepository->findConversation($this->getUser()->getId(), $id);
        $friendmessage = $messageRepository->findConversation($id, $this->getUser()->getId());
        $allmessages = [
            "mymessage" => $mymessage,
            "friendmessage" => $friendmessage
        ];
        if ($allmessages !== null) {
            return $this->json($allmessages, 200, []);
        } else {
            $info = [
                "message" => "Le message n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route('/api/message/{id}', name: 'app_message_delete', methods: ['DELETE'])]
    public function delete($id, MessageRepository $messageRepository, EntityManagerInterface $em): Response
    {
        $message = $messageRepository->find($id);

        if ($message !== null) {
            $em->remove($message);
            $em->flush();
            $info = [
                "message" => "Le message a été correctement supprimé"
            ];
            return $this->json($info, 200, []);
        } else {
            $info = [
                "message" => "Le message n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }
}
