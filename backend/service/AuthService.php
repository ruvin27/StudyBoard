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

    public function forgotPassword($email): ServiceResponse
    {
        $userData = $this->userRepository->findUserByEmail($email);

        if (!$userData) {
            return ServiceResponse::error('User Not Found');
        }
        $this->mailService->sendForgotPassEmail($userData['email'], $userData['name'], $userData['verification_code']);
        return ServiceResponse::success($userData, 'Email with Reset Link sent successfully');
    }

    public function resetPassword($email, $password): ServiceResponse
    {
        $user = $this->userRepository->findUserByEmail($email);

        if (!$user) {
            return ServiceResponse::error('User Not Found');
        }
        $hashpassword = password_hash($password, PASSWORD_BCRYPT);
        if ($this->userRepository->updatePasswordThroughReset($email, $hashpassword)) {
            return ServiceResponse::success(null, 'Password changed successfully');
        } else {
            return ServiceResponse::error('Failed to change password');
        }

        
    }


}

