<?php

require_once(BASE_DIR . '/config.php');

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

class MailService
{
    public function sendVerificationEmail($email, $name, $verificationCode): void
    {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = MAIL_HOST;
            $mail->SMTPAuth = true;
            $mail->Username = MAIL_USER;
            $mail->Password = MAIL_PASS;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom(MAIL_USER, 'StudyBoard');
            $mail->addAddress($email, $name);
            $mail->isHTML(true);
            $mail->Subject = 'Email verification';
            $mail->Body = '<p>Your verification code is: <b style="font-size: 30px;">' . $verificationCode . '</b></p>';
            $mail->send();
        } catch (Exception $e) {
            error_log("Mailer Error: " . $mail->ErrorInfo);
        }
    }
}
