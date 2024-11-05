<?php
// Fix CORS header names
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

require_once(__DIR__ . '/vendor/autoload.php'); // Fixed path separator

use Cloudinary\Cloudinary;
use Cloudinary\Transformation\Resize;

if(isset($_FILES['uploader'])) {
    // Fix file handling - use $_FILES directly instead of reading from php://input
    $img = $_FILES['uploader']['tmp_name'];
    $fileName = $_FILES['uploader']['name'];
    $extension = pathinfo($fileName, PATHINFO_EXTENSION);
    
    require "createBlog.php";
    $feed = imgUpload($img, $fileName, $uploads, $uploadTo);
    
    if($feed) {
        if(!is_dir("users")) {
            mkdir("users");
            echo "directory created";
        }
        
        move_uploaded_file($feed[0], "users/$feed[1]");
        
        // Fix comment syntax and add proper PHP comment
        // Delete all .webp files in users directory
        array_map('unlink', glob("users/*.webp"));
        
        $cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => 'depwk4x6c',
                'api_key'    => '929924193147645',
                'api_secret' => 'cr9QAMo2ANjeDKSktAsNnyrYNI4',
            ],
        ]);
        
        try {
            $response = $cloudinary->uploadApi()->upload(
                "users/$feed[1]",
                [
                    'public_id' => $feed[2]['filename'],
                    'folder' => 'lodge',
                    'http_client_options' => ['verify' => false] 
                ]
            );
            
            // No need for multiple encode/decode
            $asset_id = $response->asset_id;
            $bytes = $response->bytes;
            $fileName = $response->original_filename;
            $type = $response->type;
            $url = $response->url;
            $image = strval($url);
            
            // Store the resized image URL
            $resizedImageUrl = $cloudinary->image($response->public_id)
                                        ->resize(Resize::fill(100, 150))
                                        ->toUrl();
            
            echo json_encode([
                'success' => true,
                'fileName' => $fileName,
                'url' => $url,
                'resizedUrl' => $resizedImageUrl
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Failed to upload']);
    }
} else {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
}