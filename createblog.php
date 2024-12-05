<?php
include ('./config.php');
ini_set('display_errors', 0);
?>
<?php
require_once (ROOT_PATH . '/functions/createBlog.php');
?>
<?php
?>
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
require_once (__DIR__ . '/vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '../');
$dotenv->load();
use Cloudinary\Cloudinary;
use Cloudinary\Transformation\Resize;

if (isset($_FILES['uploader'])) {
  $data = file_get_contents('php://input');
  $data = json_decode($data);
  $img = $data;
  $fileName = $data;
  $uploads = $data;
  $uploadTo = $data;
  $imgfun = imgUpload($img, $fileName, $uploads, $uploadTo);
  $imgPath = $imgfun[2];
  if ($imgfun) {
    if (!is_dir('image')) {
      mkdir('image');
    }
    move_uploaded_file($imgfun[0], "image/$imgfun[1]");

    $cloudinary = new Cloudinary(
      [
        'cloud' => [
          'cloud_name' => $_ENV["CLOUD_NAME"],
          'api_key' => $_ENV["API_KEY"],
          'api_secret' => $_ENV["API_SECRET"],
        ],
      ]
    );

    $response = $cloudinary->uploadApi()->upload(
      "image/$imgfun[1]",
      ['public_id' => $imgPath['filename'],
       'folder' => 'lodge/cyclobold_blog']
    );
    $response = json_encode($response);
    $response = json_decode($response);
    //    $response = json_encode($response);
    if ($response) {
      $response = json_encode([
        'url' => $response->url,
        'file_name' => $response->original_filename,
        'secure_url' => $response->secure_url,
        'size' => $response->bytes,
        'created_at' => $response->created_at
      ]);
      //   $response = json_encode($response);
      if (!isset($_COOKIE['imgInfo'])) {
        setcookie('imgInfo', $response);
        echo $response;
        echo "\n";
      } else {
        setcookie('imgInfo', $response);
        echo $response;
        echo "\n";
      }
    } else {
      echo array(
        'message' => 'upload error'
      );
    }
  } else {
    echo 'could not upload image';
  }
}
$blog = createBlog();

echo json_encode($blog);