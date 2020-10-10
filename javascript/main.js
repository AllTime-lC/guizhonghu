console.log("加载成功")

require.config({
  paths:{
    jquery:"jquery-1.11.3",
    "jquery-cookie":"jquery.cookie",
    Homepage:"Homepage",
    order:"order"
  },
  //jquery-cookie  依赖于jquery
  shim:{
    //设置依赖关系
    "jquery-cookie": ["jquery"],
  }
})

require(["Homepage","order"],function(Homepage,order){
  Homepage.body(),
  order.cart()
})
