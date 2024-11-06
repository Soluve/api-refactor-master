<?
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

use Firebase\JWT\JWT;

// Your secret key
$secretKey = $_ENV['SECRET_KEY'];

// Sample data you want to encode in the token
$payload = [
    "user_id" => 123,
    "exp" => time() + (60 * 60) // Token expiration (1 hour)
];

// Encode the payload to generate a JWT
$jwt = JWT::encode($payload, $secretKey, 'HS256');
echo "Generated JWT: " . $jwt;