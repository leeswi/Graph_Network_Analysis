$(document).ready(function(){
    getProperty();
    getProperty_2();
    getProperty_3();
});

function getProperty(label){
    label=$("#node-label-center option:selected").val();//这就是selected的值
    $("#node-property-longitude").empty();
    $("#node-property-latitude").empty();
    $("#node-property").empty();
    $.ajax({
        type : "POST",
        url : "/charts/getProperty",
        data : {'label':label},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            for(let i in msg.keys){
                $("#node-property-longitude").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
                $("#node-property-latitude").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
                $("#node-property").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
            }
        },
        error:function(){
            alert("错误");
        }
    });
}
function getProperty_2(label){
    label=$("#node-label-center-2 option:selected").val();//这就是selected的值
    $("#property").empty();
    $.ajax({
        type : "POST",
        url : "/charts/getProperty",
        data : {'label':label},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            for(let i in msg.keys){
                $("#node-property-longitude-2").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
                $("#node-property-latitude-2").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
                $("#node-property-data").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
                $("#node-property-2").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
            }
        },
        error:function(){
            alert("错误");
        }
    });
}
function getProperty_3(label){
    label=$("#node-label-center-3 option:selected").val();//这就是selected的值
    $("#property").empty();
    $.ajax({
        type : "POST",
        url : "/charts/getProperty",
        data : {'label':label},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            for(let i in msg.keys){
                $("#node-property-longitude-3").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
                $("#node-property-latitude-3").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
                $("#property").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
            }
        },
        error:function(){
            alert("错误");
        }
    });
}

function search_coordinate(){
    clear_marker();
    $("#more thead").empty();
    $("#more tbody tr").empty();
    var label = $("#node-label-center option:selected").val();
    var longitude = $("#node-property-longitude option:selected").val();
    var latitude = $("#node-property-latitude option:selected").val();
    var property = $("#node-property option:selected").val();
    $.ajax({
        type : "POST",
        url : "GetCoordinate",
        data : {'label':label,'longitude':longitude,'latitude':latitude,'property':property},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            addMarker(msg);
        },
        error:function(e){
            alert("错误");
            console.log(e);
        }
    });
}
function search_region(){
    clear_marker();
    $("#more thead").empty();
    $("#more tbody tr").empty();
    var label = $("#node-label-center-2 option:selected").val();
    var longitude = $("#node-property-longitude-2 option:selected").val();
    var latitude = $("#node-property-latitude-2 option:selected").val();
    var property = $("#node-property-2 option:selected").val();
    var if_ = $("#node-property-if option:selected").val();
    var filter = $("input[name='property-filter']").val();
    $.ajax({
        type : "POST",
        url : "GetRegion",
        data : {'label':label,'longitude':longitude,'latitude':latitude,'property':property,'if_':if_,'filter':filter},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            addMarker(msg);
        },
        error:function(e){
            alert("错误");
            console.log(e);
        }
    });
}
function search_point(){
    clear_marker();
    $("#more thead").empty();
    $("#more tbody tr").empty();
    var label = $("#node-label-center-3 option:selected").val();
    var longitude = $("#node-property-longitude-3 option:selected").val();
    var latitude = $("#node-property-latitude-3 option:selected").val();
    var property = $("#property option:selected").val();
    var query = $("#query-content").val();
    $.ajax({
        type : "POST",
        url : "GetPoint",
        data : {'label':label,'longitude':longitude,'latitude':latitude,'property':property,'query':query},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            addMarker(msg);
            json = msg[0];
            var p0 = parseFloat(json.point.split("|")[0]);
            var p1 = parseFloat(json.point.split("|")[1]);
            moveTo(p0,p1)
        },
        error:function(e){
            alert("错误");
            console.log(e);
        }
    });
}
function add_layer(){
    var label = $("#node-label-center option:selected").val();
    var longitude = $("#node-property-longitude option:selected").val();
    var latitude = $("#node-property-latitude option:selected").val();
    var property = $("#node-property option:selected").val();
    $.ajax({
        type : "POST",
        url : "AddLayer",
        data : {'label':label,'longitude':longitude,'latitude':latitude,'property':property},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            if(msg == 0){alert("添加失败");return}
            else{window.location.reload();}
        },
        error:function(e){
            alert("错误");
            console.log(e);
        }
    });
}

function chooseLayer()
{
    var layer = $('#s1 option:selected').text();
    console.log(layer);
    $.ajax({
        type : "POST",
        url : "GetCoordinate",
        data : {'layer':layer},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            addMarker(msg);
        },
        error:function(e){
            alert("错误");
            console.log(e);
        }
    });
}