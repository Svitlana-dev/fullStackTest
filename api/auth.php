<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: All");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'basic.php';
require_once 'database.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    unset($_SESSION['logged_user']);
    session_unset();
    success('success');
}

MyDatabase::connectDB();

$login = post('username');
$login = preg_replace('/\s+/', '', $login);
$pwd = post('password');

if ($login === null || $pwd === null) {
    error();
} else {
    $sql = sprintf("SELECT * from `api_users` where username = '%s' and password = '%s'", $login, md5($pwd));
    $res = MyDatabase::getSQLRecords($sql);
    if (count($res) > 0) {
        $_SESSION['logged_user'] = $res[0]['id'];
        success($res[0]['id']);
    } else {
        error('Incorrect information');
    }
}
