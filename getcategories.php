<?php include("./config.php"); 
ini_set('display_errors', 0);
?>
<?php require_once(ROOT_PATH . "/functions/getCategories.php"); ?>
<?php $categories = getCategories(); ?>

<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header("Content-type: application/json");


echo json_encode($categories);