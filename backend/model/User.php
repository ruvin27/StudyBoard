<?php
require_once(BASE_DIR . '/database/Database.php');

class User
{
    private PDO $connection;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    public function findUserByEmail($email)
    {
        $stmt = $this->connection->prepare("SELECT * FROM user WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createUser($userData): bool
    {
        $stmt = $this->connection->prepare("INSERT INTO user (role, name, email, password, phone_number, verification_code, email_verified_at) VALUES (:role, :name, :email, :password, :phone_number, :verification_code, NULL)");
        return $stmt->execute($userData);
    }

    public function findUserByEmailAndOTP($email, $otp)
    {
        $stmt = $this->connection->prepare("SELECT * FROM user WHERE email = :email AND verification_code = :otp");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':otp', $otp);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateUserVerificationStatus($email, $otp)
    {
        $stmt = $this->connection->prepare("UPDATE user SET email_verified_at = NOW() WHERE email = :email AND verification_code = :otp");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':otp', $otp);
        return $stmt->execute();
    }

    public function updatePasswordThroughReset($email, $password)
    {
        $stmt = $this->connection->prepare("UPDATE user SET password = :password WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        return $stmt->execute();
    }
}
