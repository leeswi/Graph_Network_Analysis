$(function(){
    $('.classes-wrap .classes-item').click(function(){
        var i = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.list-wrap').eq(i).addClass('active').siblings().removeClass('active');
        if($("#index_setup").hasClass("active")){
            getMainIndex();
            getIndex();
        }
    })
});

function getIndex(){
    $.ajax({
        type: "GET",
        url: "/network/getIndex",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 50000,
        async: true,
        success: function (data) {
            var temp = [];
            $("#list_index").empty();
            for(let i of data){
                $("#list_index").append(i.name+' ');
                $("#main_index").append("<option>"+i.name+"</option>")
                temp.push(i.name);
            }
            var main_index = document.getElementById("data").value;
            if((temp.indexOf(main_index.substring(7)))<0){
                alert("当前索引无效，请重新设置！");
            };
        },
        error: function (err) {
            console.log("error" + err);
        }
    });
}
function getMainIndex(){
    $.ajax({
        type: "GET",
        url: "/network/getMainIndex",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 50000,
        async: true,
        success: function (data) {
            $("#main_index").append("<option disabled selected id='data'>当前设置索引："+data+"</option>");
        },
        error: function (err) {
            console.log(err);
        }
    });
}
function setMainindex(){
    var main_index = $('#main_index option:selected').text();
    if(main_index.substring(0,7)=='当前设置索引：')
    {
        alert("不可选项！")
    }else {
        $.ajax({
            url: "/network/setMainindex",
            type: "POST",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            data: {
                'main_index': main_index
            },
            dataType: "json",
            async: false,
            success: function (data) {
                getMainIndex();
            },
            error: function (msg) {
                console.log("error" + msg);
            }
        })
    }
}