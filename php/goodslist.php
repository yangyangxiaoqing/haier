<?php

    //连接数据库
    require "conn.php";
    //解决跨域
    header('Access-Control-Allow-Origin:*');//任意域名访问
    header('Access-Control-Allow-Method:POST,GET');//允许的请求方式
    
    //设置页码
    $pagesize = 12;
    
    // 获取数据 
    if(isset($_GET['inner'])){
        $inner = $_GET['inner'];
        // 获取数据的结果集
        $result=$conn->query("select * from goods where class = '$inner'");
        // 记录集的总条数 
        $num = $result->num_rows;
        //获取页数  向上取整
        $pagenum = ceil($num / $pagesize);

        //接收传入的页面
        if (isset($_GET['page'])) {
            $pagevalue = $_GET['page'];
        } else {//没有传入页码，页码为1.
            $pagevalue = 1;
        }

        $page = ($pagevalue - 1) * $pagesize;

        $sql1 = "select * from goods where class = '$inner' limit $page,$pagesize";
        $res = $conn->query($sql1);

        $arr = array();
        for ($i = 0; $i < $res->num_rows; $i++) {
            $arr[$i] = $res->fetch_assoc();
        }
        echo json_encode($arr);
        }

    
?>