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
            $mail->Body = '<!DOCTYPE html>
            <html>
            <head>
            <style>
              /* Add your CSS styles here */
              body {
                font-family: Arial, sans-serif;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
              }
              .message {
                font-size: 16px;
                margin-bottom: 20px;
              }
              .reset-link {
                font-size: 16px;
                color: #007bff;
                text-decoration: none;
              }
            </style>
            </head>
            <body>
            <div class="container">
              <p class="message">Hello, ' . $name . '</p>
              <p class="message">Please use the following to register your account with StudyBoard:</p>
              <p>Your verification code is: <b style="font-size: 30px; color: #007bff;">' . $verificationCode . '</b></p>
              <p class="message">If you did not request this code, please ignore this email.</p>
            </div>
            </body>
            </html>';

            $mail->send();
        } catch (Exception $e) {
            error_log("Mailer Error: " . $mail->ErrorInfo);
        }
    }

    public function sendForgotPassEmail($email, $name, $code): void
    {
        $link = 'http://localhost:3000';
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
            $mail->Subject = 'StudyBoard Password Reset';
            $mail->Body = "<!DOCTYPE html>
            <html>
            <head>
            <style>
              /* Add your CSS styles here */
              body {
                font-family: Arial, sans-serif;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
              }
              .message {
                font-size: 16px;
                margin-bottom: 20px;
              }
              .reset-link {
                font-size: 16px;
                color: #007bff;
                text-decoration: none;
              }
            </style>
            </head>
            <body>
            <div class='container'>
              <p class='message'>Hello, '$name'</p>
              <p class='message'>You have requested to reset your password. Please click the following link to set up your new password:</p>
              <p class='reset-link'><a href='$link/newpassword/$email/$code'>Reset Your Password</a></p>
              <p class='message'>If you did not request this reset, please ignore this email.</p>
            </div>
            </body>
            </html>";
            $mail->send();
        } catch (Exception $e) {
            error_log("Mailer Error: " . $mail->ErrorInfo);
        }
    }
}
