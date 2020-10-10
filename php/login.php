<?php
    header('content-type:text/html;charset="utf-8"');

    $responseData = array("code" => 0 , "message" => "");

    $username = $_POST['username'];
    $password = $_POST['password'];

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
    
    $link = mysql_connect("127.0.0.1","root","123456");

    if(!$link){
      $responseData['code'] = 3;
      $responseData["message"] = "服务器忙";
      echo json_encode($responseData);
      exit;
    }

    mysql_set_charset("utf8");

    mysql_select_db("preject");

    $str = md5(md5(md5($password)."beijing")."qianfeng");
    
  $sql = "SELECT * FROM register WHERE username='{$username}' AND password='{$str}'";


    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    
    if($row){
      $responseData['message'] = "登陆成功";
      echo json_encode($responseData);
    }else{
      $responseData['code'] = 4;
      $responseData['message'] = "用户名或密码错误";
      echo json_encode($responseData);
      exit;
    }
    mysql_close($link);
  
  
?>