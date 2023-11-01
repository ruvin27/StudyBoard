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

    public function updateUserActivity($email, $role) {
        $connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
        if (!$connection) {
            die("Connection failed: " . mysqli_connect_error());
        }
    
        // Check if the user already has an entry in user_activity
        $checkUserSQL = "SELECT User_email FROM user_activity WHERE User_email = '$email'";
        $checkResult = mysqli_query($connection, $checkUserSQL);
    
        if(mysqli_num_rows($checkResult) > 0) {
            // If user already exists, just update the last_logged_in timestamp
            $sql = "UPDATE user_activity SET Last_logged_in = NOW() WHERE User_email = '$email'";
        } else {
            // If user doesn't exist, insert a new record
            $sql = "INSERT INTO user_activity (User_email, Role, Last_logged_in) VALUES ('$email', '$role', NOW())";
        }
    
        mysqli_query($connection, $sql);
        mysqli_close($connection);
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

    public function loginAfterRegister($email): ServiceResponse
    {
        $userData = $this->userRepository->findUserByEmail($email);

        if (!$userData) {
            return ServiceResponse::error('User Not Found');
        }
        return ServiceResponse::success($userData, 'User Data Found');
    }


}

