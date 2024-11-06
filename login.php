<?php include("./config.php");
ini_set('display_errors', 0);
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '../');
$dotenv->load();

require_once(ROOT_PATH . "/functions/registration_login.php");
$login = loginUser(); 
// header ("Location: http://localhost:8080/views/welcome.php");

// header ("Location: http://localhost:8080/./index.php");



session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header("Content-type: application/json");


// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Firebase\JWT\JWT;
//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    $user_email = json_decode(json_encode($login['data']['email']));
    // echo ($user_email);
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'pakamo20@gmail.com';                     //SMTP username
    $mail->Password   = $_ENV['MAIL_PASSWORD'];                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('pakamo20@gmail.com', 'Mailer');
    $mail->addAddress("{$user_email}", 'Joe User');     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('$user_email', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'Welcome by soluve tech........... <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    try {
        

        // secret key
        $secretKey = $_ENV['SECRET_KEY'];

        // Sample data to encode in the token
        $payload = [
            "user_id" => $user_detail['id'],
            "exp" => time() + (60 * 60) // Token expiration (1 hour)
        ];

        // Encode the payload to generate a JWT
        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        $JWTres = array(
            "JWT" => $jwt
        );
        $loginData = array_merge(array($login), array($JWTres));
        // echo "Generated JWT: " . $jwt;
        echo (json_encode($loginData));
        ob_start(); // Start output buffering
        $mail->send();
        $_SESSION['user_id'] = $user_detail['id'];
        ob_end_clean(); // Clear any output
        
        // echo json_encode('Message has been sent');
        // header("Location: http://localhost:8080/views/welcome.php");
        exit();
    } catch (Exception $e) {
        // Handle error
        header("Location: error-page.php");
        exit();
    }
    
    
    
    

    
} catch (Exception $e) {
    echo json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
}

;