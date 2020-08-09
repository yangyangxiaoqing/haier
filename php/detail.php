<?php

    //连接数据库
    require "conn.php";
    //解决跨域
    header('Access-Control-Allow-Origin:*');//任意域名访问
    header('Access-Control-Allow-Method:POST,GET');//允许的请求方式
    
    
    // 获取数据 
    if(isset($_GET['gid'])){
        $gid = $_GET['gid'];
        // 获取数据的结果集
        $result=$conn->query("select * from goods where gid = '$gid'");
        // 记录集的总条数 
        echo json_encode($result->fetch_assoc());
    }
?>