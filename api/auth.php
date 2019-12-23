<?php

// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Max-Age: 3600");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include_once 'config/config.php';
// $res = [];
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // $data = json_decode(file_get_contents("php://input"));
//     // print_r($data);

//     $sql = "SELECT * from api_users where username = '".$_POST['username']."' AND password='".$_POST['password']."'";
//     // echo $sql;
//     $result = $conn->query($sql);
//     // print_r($result);
    
//     if($result->num_rows > 0){
//         $row = $result->fetch_assoc();
//         $_SESSION['user_id'] = $row['id'];
//         $res = ['status'=>200, 'message'=>'authenticated successfully.','data'=>['id'=>$row['id'],'username'=>$row['username']]];
//     }else{
//         $res = ['status'=>401, 'message'=>'authentication failed.'];
//     }
//     echo json_encode($res);
//     die();
// }elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
//     setcookie("user_id", "", time() -1*24*60*60*1000,'/');
//     $res=['status'=>200,'message'=>'Successfully logout.'];
//     echo json_encode($res);
//     die();
// }else{
//     $res = ['status'=>400, 'message'=>'Bad request.'];
//     echo json_encode($res);
//     die();
// }

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
