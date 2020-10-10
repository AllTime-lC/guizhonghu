define(["jquery"],function($){
  function loginsend(){
    $(".loginyes").click(function(){
      $.ajax({
        type:"post",
        url:"php/login.php",
        data:{
          username:$(".phonePassword").val(),
          password:$(".loginPassword").val()
        },
        success:function(result){
          var obj = JSON.parse(result);
          if(obj.code){
            $(".warning").attr("class","warning warning-error");
          }else{
            $(".warning").attr("class","warning warning-success");
          }
          $(".warning").show().html(obj.message);
        },
        error:function(msg){
          console.log(msg)
        }
      })
    })
  }
  return {
    loginsend:loginsend
  }
})