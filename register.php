<?php include("./config.php"); 
ini_set('display_errors', 0)
?>
<?php require(ROOT_PATH . "/functions/registration_login.php") ?>
<?php $data = registerUser();
// echo "<script>window.location.href = 'welcome.php';</script>";





echo json_encode($data);
?>