<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor\autoload.php';
header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    //collect post data
    $to = $_POST['to'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    //initialize PHPMailer
    $mail = new PHPMailer(true);
    try{
        //SMTP settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; //replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'pakamo20@gmail.com';
        $mail->Password = 'bgjjpcbgblarccfw';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        //Email settings
        $mail->setFrom('pakamo20@gmail.com', 'Akamo Philip');
        $mail->addAddress($to);
        $mail->Subject = $subject;
        $mail->Body = $message;

        //send email
        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);

    }catch (Exception $e){
        echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
}else{
    echo json_encode(['staus' => 'error', 'message' =>'Invalid request method']);
}