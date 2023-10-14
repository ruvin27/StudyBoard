<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

require('../config.php');
session_start();

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
$json = file_get_contents('php://input');
$data = json_decode($json);
if (isset($data->email) && isset($data->password) && isset($data->name) && isset($data->phone_number) && isset($data->role)) {

$email = mysqli_real_escape_string($connection, $data->email);
$password = password_hash($data->password, PASSWORD_BCRYPT);
$name = mysqli_real_escape_string($connection, $data->name);
$phone_number = mysqli_real_escape_string($connection, $data->phone_number);
$role = mysqli_real_escape_string($connection, $data->role);

$query = "SELECT * FROM user WHERE email = '$email'";
$res = mysqli_query($connection, $query);

if (!$res || mysqli_num_rows($res) == 0) {
    $mail = new PHPMailer(true);
 
        try {
            //Enable verbose debug output
            $mail->SMTPDebug = 0;//SMTP::DEBUG_SERVER;
 
            //Send using SMTP
            $mail->isSMTP();
 
            //Set the SMTP server to send through
            $mail->Host = MAIL_HOST;
 
            //Enable SMTP authentication
            $mail->SMTPAuth = true;
 
            //SMTP username
            $mail->Username = MAIL_USER;
 
            //SMTP password
            $mail->Password = MAIL_PASS;
 
            //Enable TLS encryption;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
 
            //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
            $mail->Port = 587;
 
            //Recipients
            $mail->setFrom('ruvin27@gmail.com', 'StudyBoard');
 
            //Add a recipient
            $mail->addAddress($email, $name);
 
            //Set email format to HTML
            $mail->isHTML(true);
 
            $verification_code = substr(number_format(time() * rand(), 0, '', ''), 0, 6);
 
            $mail->Subject = 'Email verification';
            $mail->Body    = '<p>Your verification code is: <b style="font-size: 30px;">' . $verification_code . '</b></p>';
 
            $mail->send();
            // echo 'Message has been sent';
 
            $query = "INSERT INTO user (role, name, email, password, phone_number, verification_code, email_verified_at) 
            VALUES ('$role', '$name', '$email', '$password', '$phone_number', '" . $verification_code . "', NULL)";
            if (mysqli_query($connection, $query)) {
                echo true;
            } else {
                echo("Registration Failed");
            } 
           
 
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }

} else {
    echo('User already registered');
}
} else {
    echo('Incomplete data');
}
mysqli_close($connection);
?>
