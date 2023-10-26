<?php
require_once(BASE_DIR . '/model/User.php');
require_once(BASE_DIR . '/service/MailService.php');
require_once(BASE_DIR . '/model/UserModel.php');

class AuthService
{
    private User $userRepository;

    private MailService $mailService;

    public function __construct()
    {
        $this->userRepository = new User();
        $this->mailService = new MailService();
    }

    public function login($email, $password): ServiceResponse
    {
        $user = $this->userRepository->findUserByEmail($email);
        if (!$user) {
            return ServiceResponse::error('User not found');
        }

        if (password_verify($password, $user['password'])) {
            return ServiceResponse::success($user);
        } else {
            return ServiceResponse::error('Invalid credentials');
        }
    }

    public function register(UserModel $userData): ServiceResponse
    {

        $existingUser = $this->userRepository->findUserByEmail($userData->email);
        if ($existingUser) {
            return ServiceResponse::error('Email already registered');
        }

        $userData->generateVerificationCode();
        $userData->hashPassword();

        if ($this->userRepository->createUser($userData->toArray())) {
            $this->mailService->sendVerificationEmail($userData->email, $userData->name, $userData->verificationCode);
            return ServiceResponse::success(null, 'User registered successfully');
        } else {
            return ServiceResponse::error('Failed to register user');
        }
    }

    public function verifyOTP($email, $otp): ServiceResponse
    {
        $user = $this->userRepository->findUserByEmailAndOTP($email, $otp);

        if (!$user) {
            return ServiceResponse::error('Invalid OTP');
        }

        if ($this->userRepository->updateUserVerificationStatus($email, $otp)) {
            $updatedUser = $this->userRepository->findUserByEmail($email);
            return ServiceResponse::success($updatedUser, 'OTP verified successfully');
        } else {
            return ServiceResponse::error('Failed to verify OTP');
        }
    }


}

