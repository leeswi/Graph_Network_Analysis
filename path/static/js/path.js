function getProperty(id1,id2){
    $("#"+id2).empty();
    $("#"+id2).append("<option selected=\"selected\" disabled=\"disabled\" value=''>选择对象属性</option>");
    label=$("#"+id1+" option:selected").val();//这就是selected的值
    $.ajax({
        type : "POST",
        url : "/charts/getProperty",
        data : {'label':label},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            for(let i in msg.keys){
                $("#"+id2).append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
            }
        },
        error:function(){
            alert("错误");
    }
    });
}