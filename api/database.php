<?php

class MyDatabase{

    static $dbhost = 'localhost';
    static $dbuser = 'root';
    static $dbpassword = '';
    static $dbname = 'userdb';

    static $conn = null;

    static function connectDB(){
        self::$conn = mysqli_connect(self::$dbhost, self::$dbuser, self::$dbpassword, self::$dbname);
        return self::$conn;
    }

    static function disconnectDB(){
        if(self::$conn) mysqli_close(self::$conn);
    }

    static function getSQLRecords($qry){
        $res = array();

        if(!self::$conn){
            return $res;
        }
        $result = mysqli_query(self::$conn, $qry);
        if(!$result){
            return $res;
        }
        while($row = mysqli_fetch_array($result)){
            $res[] = $row;
        }
        return $res;
    }

    static function executeSQL($qry){
        if(!self::$conn){
            return false;
        }
        $result = mysqli_query(self::$conn, $qry);

        if($result) return true;
        else return false;
    }

    static function lastInsertId(){
        return mysqli_insert_id(self::$conn);
    }

    static function lastError(){
        return mysqli_error(self::$conn);
    }
}
