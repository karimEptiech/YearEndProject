<?php

namespace App\Controller;

use App\Entity\Friend;
use App\Repository\FriendRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class FriendController extends AbstractController
{
    #[Route(path: '/api/friends', name: 'api_friend_current', methods: ['GET'])]
    public function currentUser(FriendRepository $friendRepository)
    {
        $user = $this->getUser()->getId();
        $friends = $friendRepository->findBy(array('currentuserid' => $user));
        if ($friends !== null) {
            return $this->json($friends, 200, []);
        } else {
            $info = [
                "message" => "Vous n'avez pas d'ami"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route(path: '/api/friend/{id}', name: 'api_friend_info', methods: ['GET'])]
    public function info($id, FriendRepository $friendRepository, UserRepository $userRepository)
    {
        $user = $this->getUser()->getId();
        $friends = $friendRepository->findBy(array('currentuserid' => $user));
        if ($friends !== null) {
            $friendinfo = $userRepository->find($id);
            $info = [
                "friends" => $friends,
                "info" => $friendinfo
            ];
            return $this->json($info, 200, []);
        } else {
            $info = [
                "message" => "Vous n'avez pas d'ami"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route(path: '/api/friend/add/{id}', name: 'api_friend_add', methods: ['POST'])]
    public function addFriend($id, EntityManagerInterface $em, UserRepository $userRepository, FriendRepository $friendRepository): JsonResponse
    {
        $user = $userRepository->find($id);
        if ($id == $this->getUser()->getId()) {
            $info = [
                "message" => "Vous ne pouvez pas vous ajouter vous même en ami"
            ];
            return $this->json($info, 400, []);
        }
        $friendcheck = $friendRepository->findBy(array("friendid" => $id));
        if ($friendcheck !== [] || $friendcheck !== null) {
            $info = [
                "message" => "Cet utilisateur est déjà dans votre liste d'amis"
            ];
            return $this->json($info, 400, []);
        }
        if ($user !== null) {
            $friend = new Friend;
            $friend->setCurrentUserId($this->getUser()->getId());
            $friend->setFriendId($id);
            $em->persist($friend);
            $em->flush();
            $info = [
                "message" => "Vous avez ajouté un ami",
                "user" => $user,
                "friend" => $friend
            ];
            return $this->json($info, 201, []);
        } else {
            $info = [
                "message" => "Cet utilisateur n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route(path: '/api/friend/{id}', name: 'api_delete_friend', methods: ['DELETE'])]
    public function deleteFriend(EntityManagerInterface $em, $id, FriendRepository $friendRepository)
    {
        $friend = $friendRepository->findBy(array('friendid' => $id));
        if ($friend !== null && $friend !== []) {

            $info = [
                "message" => "L'ami a été correctement supprimée"
            ];
            $em->remove($friend[0]);
            $em->flush();
            return $this->json($info, 200, []);
        } else {
            $info = [
                "message" => "Cet ami n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }
}
