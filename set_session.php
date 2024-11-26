<?php
session_start();

// Get the JSON data
$jsonData = file_get_contents('php://input');
// echo($jsonData);
$userData = json_decode($jsonData, true);

// if ($userData) {
//     // Set session variables
//     $_SESSION['user_id'] = $userData['id'];
//     $_SESSION['user_email'] = $userData['email'];
//     $_SESSION['user_role'] = $userData['role'];
    
//     // Send success response
//     header('Content-Type: application/json');
//     echo json_encode(['success' => true, "data" => $userData]);
// } else {
//     // Send error response
//     header('Content-Type: application/json');
//     echo json_encode(['success' => false, 'message' => 'Invalid data received']);
// }
$auth_header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';

 
    $token = $auth_header; // Remove 'Bearer ' from the start
    
    // Get the JSON data
    $jsonData = file_get_contents('php://input');
    $userData = json_decode($jsonData, true);

    if ($userData && $token) {
        // Set session variables
        $_SESSION['user_id'] = $userData['id'];
        $_SESSION['user_email'] = $userData['email'];
        $_SESSION['user_role'] = $userData['role'];
        $_SESSION['token'] = $token; // Store the token in session if needed
        
        // Send success response
        header('Content-Type: application/json');
        echo json_encode(['success' => true, ]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Invalid data received']);
    }
 
?>