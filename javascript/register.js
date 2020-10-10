define(["jquery"],function($){
  function registersend(){
    $(".registeryes").click(function(){
      $.ajax({
        type:"post",
        url:"./php/register.php",
        data:{
          username:$(".inputt1").val(),
          password:$(".inputt2").val(),
          repassword:$(".inputt3").val(),
          createtime:(new Date()).getTime()
        },
        success:function(result){
          console.log(result)
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