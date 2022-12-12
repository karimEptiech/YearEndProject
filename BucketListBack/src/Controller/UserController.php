<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{

    #[Route(path: '/api/user/me', name: 'api_users_current', methods: ['GET'])]
    public function user()
    {
        $user = $this->getUser();
        return $this->json($user, 200, []);
    }

    #[Route(path: '/api/users', name: 'api_users_all', methods: ['GET'])]
    public function allusers(UserRepository $userRepository)
    {
        $user = $userRepository->findAll();
        if ($user !== null) {
            return $this->json($user, 200, []);
        } else {
            $info = [
                "message" => "Il n'y a pas d'utilisateur"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route(path: '/api/user/{id}', name: 'api_users_find', methods: ['GET'])]
    public function find($id, UserRepository $userRepository)
    {
        $user = $userRepository->find($id);
        if ($user !== null) {
            return $this->json($user, 200, []);
        } else {
            $info = [
                "message" => "Cet utilisateur n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route(path: '/api/user/{id}', name: 'api_users_modify', methods: ['PUT'])]
    public function modify($id, UserRepository $userRepository, Request $request, ValidatorInterface $validator, SerializerInterface $serializer, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $em)
    {
        $user = $userRepository->find($id);
        if ($user !== null) {
            $data = $request->getContent();
            $new = $serializer->deserialize($data, User::class, 'json');
            $errors = $validator->validate($new);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }
            $user->setEmail($new->getEmail());
            $user->setFirstname($new->getFirstname());
            $user->setLastname($new->getLastname());
            $user->setBio($new->getBio());
            $user->setPhoto($new->getPhoto());
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $new,
                    $new->getPassword()
                )
            );
            $em->persist($user);
            $em->flush();

            return $this->json($user, 200, []);
        } else {
            $info = [
                "message" => "Cet utilisateur n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route(path: '/api/user/{id}', name: 'api_users_delete', methods: ['DELETE'])]
    public function delete($id, EntityManagerInterface $em, UserRepository $userRepository)
    {
        $user = $userRepository->find($id);

        if ($user !== null) {
            $info = [
                "message" => "L'utilisateur a été correctement supprimée"
            ];
            $em->remove($user);
            $em->flush();
            return $this->json($info, 200, []);
        } else {
            $info = [
                "message" => "Cet utilisateur n'existe pas"
            ];
            return $this->json($info, 404, []);
        }
    }

    #[Route(path: '/api/register', name: 'api_users_register', methods: ['POST'])]
    public function register(Request $request, SerializerInterface $serializer, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $em, ValidatorInterface $validator)
    {

        $data = $request->getContent();
        $new = $serializer->deserialize($data, User::class, 'json');
        $errors = $validator->validate($new);
        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }
        $user = new User;

        $user->setEmail($new->getEmail());
        $user->setFirstname($new->getFirstname());
        $user->setLastname($new->getLastname());
        $user->setBio($new->getBio());
        $user->setPhoto($new->getPhoto());
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $new,
                $new->getPassword()
            )
        );
        $em->persist($user);
        $em->flush();

        return $this->json($user, 201, []);
    }
}
