<?php
include ('./config.php');
?>
<?php
require_once (ROOT_PATH . '/functions/addComment.php');
?>
<?php
?>
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
require_once (__DIR__ . '/vendor/autoload.php');

$comment = addComment();
echo json_encode($comment);