<?php


class UserModel
{
    public $email;
    public $password;
    public $name;
    public $phoneNumber;
    public $role;
    public $verificationCode;

    public function __construct($email, $password, $name, $phoneNumber, $role)
    {
        $this->email = $email;
        $this->password = $password;
        $this->name = $name;
        $this->phoneNumber = $phoneNumber;
        $this->role = $role;
    }

    public function generateVerificationCode(): void
    {
        $this->verificationCode = substr(number_format(time() * rand(), 0, '', ''), 0, 6);
    }

    public function hashPassword(): void
    {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function toArray(): array
    {
        return [
            'email' => $this->email,
            'password' => $this->password,
            'name' => $this->name,
            'phone_number' => $this->phoneNumber,
            'role' => $this->role,
            'verification_code' => $this->verificationCode,
        ];
    }
}
