<?php
    header('content-type:text/html;charset="utf-8"');

    $responseData = array("code" => 0 , "message" => "");

    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $createtime = $_POST['createtime'];

    //判断

    if(!$username){
      $responseData["code"] = 1;
      $responseData["message"] = "用户名不能为空";

      echo json_encode($responseData);
      exit;
    }
    if(!$password){
      $responseData["code"] = 2;
      $responseData["message"] = "密码不能为空";
      echo json_encode($responseData);
      exit;
    }
    if($repassword !== $password){
      $responseData["code"] = 3;
      $responseData["message"] = "两次密码输入不一致";

      echo json_encode($responseData);
      exit;
    }

    $link = mysql_connect("127.0.0.1","root","123456");

    if(!$link){
      $responseData['code'] = 4;
      $responseData["message"] = "服务器忙";
      echo json_encode($responseData);
      exit;
    }

    mysql_set_charset("utf8");

    mysql_select_db("preject");

    $sql = "SELECT * FROM register WHERE username='{$username}'";

    $res = mysql_query($sql);

    //取出数据
    $row = mysql_fetch_assoc($res);
    if($row){
      $responseData['code'] = 5;
      $responseData["message"] = "用户名已存在";
      echo json_encode($responseData);
      exit;
    }


    $str = md5(md5(md5($password)."beijing")."qianfeng");

    //注册
    $sql2 = "INSERT INTO register(username,password,createtime) VALUES('{$username}','{$str}','{$createtime}')";

    $res2 = mysql_query($sql2);

    if(!$res2){
      $responseData['code'] = 6;
      $responseData["message"] = "注册失败";
      echo json_encode($responseData);
      exit;
    }

    $responseData["message"] = "注册成功";
    echo json_encode($responseData);

    mysql_close($link);
    
?>