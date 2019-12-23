<?php 
header("Content-Type: application/json; charset=UTF-8");

require_once 'basic.php';
require_once 'database.php';

session_start();

if (!isset($_SESSION['logged_user'])) {
  error('You must logged in');
}

MyDatabase::connectDB();

$users = MyDatabase::getSQLRecords("SELECT * from students");

success($users);
