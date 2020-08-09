<?php
    require "conn.php";
    
    //解决跨域
    header('Access-Control-Allow-Origin:*');//任意域名访问
    header('Access-Control-Allow-Method:POST,GET');//允许的请求方式

    //连接数据库成功
    if(isset($_POST['telphone']) && isset($_POST['password'])){
        $telphone = $_POST['telphone'];
        $password = $_POST['password'];
        // echo $telphone;
        $result = $conn->query("select * from user where telphone = '$telphone' and password = '$password'");

        if($result->fetch_assoc()){
            echo true;
        }else{//匹配不成功
            echo false;
        }
    };
?>