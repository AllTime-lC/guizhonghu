define(["jquery","jquery-cookie"],function($){
  function cart(){
  $(function(){
    Number()
    Information()

  $.ajax({
    url:"../data/goods.json",
    success:function(arr){
      var str = ``;
      for(var i = 0 ; i < arr.length ; i++){
        str += `
        <div class="goodsbtnA">
         <div><a href="${arr[i].src}"><img src="${arr[i].img}" alt=""></a></div>
        <span class="goodsspan1">${arr[i].colortype}</span>
        <a href="">${arr[i].name}</a>
        <span class="goodsspan2">${arr[i].shoestype}</span>
        <span class="goodsspan3">${arr[i].price}</span>
        <span class="goodsspan4" id="${arr[i].id}">加入购物车</span>
        </div>
        `;
      }
      $(".goods").html(str);
    }
    ,error:function(msg){
      console.log(msg)
    }
  })

  //给加入购物车按钮添加点击
  //设置cookie  (1)只能存储字符串  (2)cookie有大小限制
  //
  $(".goods").on("click",".goodsspan4",function(){
    //取出当前点击加入购车按钮的id
    var id = this.id;
  //   //判断是否是第一次存入
    var first = !($.cookie("goods"));
    if(first){
      $.cookie("goods",JSON.stringify([{id:id,num:1}]),{
        expires:7
      });
    }else{
      //不是第一次 判断之前有没有添加过
      //取出数据
      var cookieArr = JSON.parse($.cookie("goods"));
      var same = false;
      for(var i = 0 ; i < cookieArr.length ; i++){
        if(cookieArr[i].id == id){
          same = true;
          break;
        }
      }
      same ? cookieArr[i].num++ : cookieArr.push({id:id,num:1});
      //存回数据
      $.cookie("goods",JSON.stringify(cookieArr),{
        expires:7
      })
    }
    Information()
    Number()
  })

  // //加载右侧购物车内的数据
  // //购物车内的数据存在cookie中  商品数据在服务器

  function Information(){
    var cookieStr = $.cookie("goods")
    if(!cookieStr){
      return;
    }
    //下载所有商品的数据
    $.ajax({
      url:"../data/goods.json",
      success:function(arr){      
        var cookieArr = JSON.parse(cookieStr);
        var newArr = [];
        for(var i = 0 ; i < arr.length ; i++){
          for(var j = 0 ; j < cookieArr.length ; j++){
            if(cookieArr[j].id == arr[i].id){
              arr[i].num = cookieArr[j].num;
              newArr.push(arr[i]);
              break;
            }
          }
        }
        var stra = ``;
        for(var i = 0 ; i < newArr.length ; i++){
        stra +=`
        <div class="goodsformation" id="${newArr[i].id}">
              <img src="${newArr[i].img}" alt="">
            <div class="mationb1">
              <a href="">${newArr[i].name}</a>
              <div class="mationA">${newArr[i].colortype}</div>
              <div class="mationB">尺码：36</div>
              <div class="mationC">编辑</div>
            </div>
            <div class="mationb2">${newArr[i].price}</div>
            <div class="mationb3">
              <span class="spanA">商品数量:${newArr[i].num}</span>
              <span class="spanC">+</span>
              <span class="spanD">-</span>
              <span class="spanB">删除</span>
            </div>
            <div class="mationb4"></div>
            <input type="text" style="width:10px;height:10px">
            </div>`
            $(".goodsmation").html(stra)
        }

        var strb = ``;
        for(var i = 0 ; i < newArr.length ; i++){
          strb += `<div class="goodsimg" id="${newArr[i].id}">
          <img src="${newArr[i].img}" alt="">
          <div class="goodsmation">
          <div class="name">${newArr[i].name}</div>
          <div class="buy">购买</div>
          <div class="delete">删除</div>
          <div class="up">+</div>
          <div class="low">-</div>
          <span class="goodsnum">商品数量:${newArr[i].num}</span>
        </div>
        </div>`
        $(".spann10").html(strb)
        }
        
      },
      error:function(msg){
        console.log(msg)
      }
    })
  }

  Number()
  Information()
  // //处理数据

  function Number(){
    var cookieStr = $.cookie("goods");
    var sum = 0 ;
    if(cookieStr){
      var cookieArr = JSON.parse(cookieStr);
      for(var i = 0 ; i < cookieArr.length ; i++){
        sum += cookieArr[i].num;
      }
    }
    $(".spann9").html(sum)
  }


  //删除
  $(".goodsmation").on("click",".spanB",function(){
    var  id = $(this).parents(".goodsformation").remove().attr("id");
    var cookieArr = JSON.parse($.cookie("goods"));
    for(var i = 0 ; i < cookieArr.length ; i++){
      if(cookieArr[i].id == id){
        cookieArr.splice(i,1)
        break;
      }
    }
    if(cookieArr.length){
      $.cookie("goods",JSON.stringify(cookieArr),{
        expires:7
      })
    }else{
      $.cookie("goods",null)
    }
    //更新数据
    Number();
  })


  //+-
  $(".goodsmation").on("click",".spanC ,.spanD",function(){
    var  id = $(this).parents(".goodsformation").attr("id");
    var cookieArr = JSON.parse($.cookie("goods"));
    for(var i = 0 ; i < cookieArr.length ; i++){
      if(cookieArr[i].id == id){
        break;
      }
    }
    if(this.innerHTML == "+"){
      cookieArr[i].num++;
    }else{
      cookieArr[i].num == 1 ? alert("数量为1，不能减少") : cookieArr[i].num--;
    }
    $.cookie("goods",JSON.stringify(cookieArr),{
      expires:7
    })
    //修改页面上的数量
    $(this).siblings(".spanA").html(`商品数量:${cookieArr[i].num}`)
    Number();
      })
    })
  }
  return {
    cart:cart
  }
})