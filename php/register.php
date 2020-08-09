<?php
    include "conn.php";

    if(isset($_POST['tel'])){
        $telphone = $_POST['tel'];

        $result=$conn->query("select * from user where telphone = '$telphone'");//和数据库进行匹配

        if($result->fetch_assoc()){//返回数组，用户名存在
            echo true;//1
        }else{//用户名不存在
            echo false;//空
        }
    }
    
    
    //判断是否点击submit
    if(isset($_POST['submit'])){
        $telphone = $_POST['tel'];
        $password =sha1($_POST['pass']);
        $conn->query("insert user values(null,'$telphone','$password')");
    }
    

?>