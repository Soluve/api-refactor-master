<?php
function createConn (){
$HOST = 'localhost';
$USER = 'root';
$PASSWORD = 'password';
$DB = 'blogdb';
$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB);

if(!$conn){
    
     die('Failed to connect to database' . mysqli_connect_error());
}


$query = "CREATE DATABASE IF NOT EXISTS `blogdb`";

$connection = mysqli_query($conn, $query);

if($connection){
    echo "Successfully connected to database";
}else{
    echo "Error: " . mysqli_error($conn);
}


mysqli_close($conn);
}