define(["jquery"],function($){
  function registersend(){
    $(".registeryes").click(function(){
      $.ajax({
        type:"post",
        url:"./php/register.php",
        data:{
          username:$(".inputt1").val(),
          password:$(".inputt2").val(),
          createtime:(new Date()).getTime(),
          repassword:$(".inputt3").val()
          
        },
        success:function(result){
          // 解析
          var obj = JSON.parse(result);
          if(obj.code){
            $(".registerRight .warning").attr("class","warning warning-error");
          }else{
            $(".registerRight .warning").attr("class","warning warning-success");
          }
          $(".registerRight .warning").show().html(obj.message);
        },
        error:function(msg){
          console.log(msg)
        }
      })
    })
  }

  return {
    registersend:registersend
  }
})