<?php include("./config.php"); ?>
<?php require_once(ROOT_PATH . "/functions/getRoles.php") ?>
<?php $roles = getRoles(); ?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header("Content-type: application/json");
    echo json_encode($roles);
    exit;