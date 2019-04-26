
$(document).ready(function(){
    getProperty();
    getRelationship();
    getRelationship_right();
});

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    var algo= $("#node-algo option:selected").val();
    var label= $("#node-label option:selected").val();
    var link= $("#node-link option:selected").val();
    if(link=='----'){link = ''};

    oTableInit.Init = function () {
        $('#charts_left').bootstrapTable({
            ajax : function (request) {
                $.ajax({
                    type : "GET",
                    url : "centrality?label=" + encodeURIComponent(label)+"&algo="+encodeURIComponent(algo)+"&link="+encodeURIComponent(link),
                    contentType: "application/json;charset=utf-8",
                    dataType:"json",
                    success : function (msg) {
                        request.success({
                            row : msg
                        });
                        var charts_data = msg[msg.length-1];
                        msg.splice(msg.length-1,1);
                        $('#charts_left').bootstrapTable('load', msg);
                        left_charts(charts_data);
                    },
                    error:function(){
                        alert("错误");
                        $("#charts_left").bootstrapTable('destroy');
                    }
                });
            },
            // url: 'centrality',         //请求后台的URL（*）
            // method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            // queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            strictSearch: true,
            search: false,                      //是否显示表格搜索
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: false,                //是否启用点击选中行
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                field: 'id',
                title: 'ID',
                width:20,
            }, {
                field: 'node',
                title: '节点',
                width:100,
            }, {
                field: 'centrality',
                title: '评估值',
                width:70,
            } ]
        });
    };
    return oTableInit;
};

var TableInit_right = function () {
    var oTableInit = new Object();
    var algo_right = $("#node-algo-right option:selected").val();
    var label_right = $("#node-label-right option:selected").val();
    var link_right = $("#node-link-right option:selected").val();
    var input_right = $("#node-input").val();
    oTableInit.Init = function () {
        $('#charts_right').bootstrapTable({
            ajax : function (request) {
                $.ajax({
                    type : "POST",
                    url : "CommunityDetection",
                    data : {'algo':algo_right,'label':label_right,'link':link_right,'input':input_right},
                    contentType: "application/x-www-form-urlencoded;charset=utf-8",
                    dataType:"json",
                    success : function (msg) {
                        if(msg==0){alert('映射表无记录！');$("#charts_right").bootstrapTable('destroy');return}
                        $('#charts_right').bootstrapTable('load', msg);
                        $('#charts_right').bootstrapTable('hideLoading');
                    },
                    error:function(){
                        alert("错误");
                        $("#charts_right").bootstrapTable('destroy');
                    }
                });
            },
            // url: 'centrality',         //请求后台的URL（*）
            // method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            // queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            strictSearch: true,
            search: false,                      //是否显示表格搜索
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: false,                //是否启用点击选中行
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                field: 'community',
                title: '社区ID',
                width:20,
            }, {
                field: 'name',
                title: '社区相似节点',
                width:100,
            }]
        });
    };
    return oTableInit;
};

function refresh() {
    $("#charts_left").bootstrapTable('destroy');
    var oTable = new TableInit();
    oTable.Init();
}
function refresh_right() {
    $("#charts_right").bootstrapTable('destroy');
    var oTable_r = new TableInit_right();
    oTable_r.Init();
}

// 折线图
function left_charts(data){
    var myChart = echarts.init($("#whearAbook")[0]);
    var colors = ['#5793f3', '#d14a61', '#675bba'];
    option = {
        color: colors,
        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data:['分布曲线'],
            textStyle:{
                color:"#e9ebee"
            }
        },
        grid: {
            x:46,
            y:30,
            x2:30,
            y2:30,
            borderWidth: 0
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '评估值  ' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: ["0-0.2","0.2-0.4","0.4-0.6","0.6-0.8","0.8-1.0"]
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel : {
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        series: [
            {
                name:'分布曲线',
                type:'line',
                smooth: true,
                data: data
            }
        ]
    };

    myChart.setOption(option);
}

function getProperty(label){
    label=$("#node-label-center option:selected").val();//这就是selected的值
    $("#node-property-longitude").empty();
    $("#node-property-latitude").empty();
    $("#node-property-city").empty();
    $("#node-property-data").empty();
    $("#node-property-longitude").append("<option selected=\"selected\" disabled=\"disabled\"  style='display: none' value=''>--经度--</option>")
    $("#node-property-latitude").append("<option selected=\"selected\" disabled=\"disabled\"  style='display: none' value=''>--纬度--</option>");
    $("#node-property-city").append("<option selected=\"selected\" disabled=\"disabled\"  style='display: none' value=''>--省市--</option>");
    $("#node-property-data").append("<option selected=\"selected\" disabled=\"disabled\"  style='display: none' value=''>--数据项--</option>");
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
                $("#node-property-city").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
                $("#node-property-data").append("<option value='"+msg.keys[i]+"'>"+msg.keys[i]+"</option>");
            }
        },
        error:function(){
            alert("错误");
        }
    });
}

function getRelationship(label){
    label=$("#node-label option:selected").val();//这就是selected的值
    $("#node-link").empty();
    $("#node-link").append("<option>----</option>");
    $.ajax({
        type : "POST",
        url : "/charts/getRelationship",
        data : {'label':label},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            for(let i in msg){
                $("#node-link").append("<option value='"+msg[i].keys+"'>"+msg[i].keys+"</option>");
            }
        },
        error:function(){
            alert("错误");
        }
    });
}
function getRelationship_right(label){
    label=$("#node-label-right option:selected").val();//这就是selected的值
    $("#node-link-right").empty();
    $("#node-link-right").append("<option>----</option>");
    $.ajax({
        type : "POST",
        url : "/charts/getRelationship",
        data : {'label':label},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            for(let i in msg){
                $("#node-link-right").append("<option value='"+msg[i].keys+"'>"+msg[i].keys+"</option>");
            }
        },
        error:function(){
            alert("错误");
        }
    });
}
function get_geo(){
    $("#charts_center").bootstrapTable('destroy');
    var label = $("#node-label-center option:selected").val();
    var longitude = $("#node-property-longitude option:selected").val();
    var latitude = $("#node-property-latitude option:selected").val();
    var city = $("#node-property-city option:selected").val();
    var data = $("#node-property-data option:selected").val();

    var TableInit_center = function () {
        var oTableInit = new Object();

        oTableInit.Init = function () {
            $('#charts_center').bootstrapTable({
                ajax : function (request) {
                    $.ajax({
                        type : "POST",
                        url : "GetGeo",
                        data : {'label':label,'longitude':longitude,'latitude':latitude,'city':city,'data':data},
                        contentType: "application/x-www-form-urlencoded;charset=utf-8",
                        dataType:"json",
                        success : function (msg) {
                            if(msg==0){$("#charts_center").bootstrapTable('destroy');alert('映射表无记录！');return}
                            if(msg==-1){alert('查询参数错误，请重新输入！');return}
                            $('#charts_center').bootstrapTable('load', msg);
                            $('#charts_center').bootstrapTable('hideLoading');
                        },
                        error:function(){
                            alert("错误");
                            $("#charts_center").bootstrapTable('destroy');
                        }
                    });
                },
                toolbar: '#toolbar',                //工具按钮用哪个容器
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: false,                     //是否启用排序
                sortOrder: "asc",                   //排序方式
                // queryParams: oTableInit.queryParams,//传递参数（*）
                sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber:1,                       //初始化加载第一页，默认第一页
                pageSize: 5,                       //每页的记录行数（*）
                strictSearch: true,
                search: false,                      //是否显示表格搜索
                minimumCountColumns: 2,             //最少允许的列数
                clickToSelect: false,                //是否启用点击选中行
                uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                cardView: false,                    //是否显示详细视图
                detailView: false,                   //是否显示父子表
                columns: [{
                    field: 'name',
                    title: '节点',
                    width:20,
                }, {
                    field: 'longitude',
                    title: '经度',
                    width:40,
                },{
                    field: 'latitude',
                    title: '纬度',
                    width:40,
                },{
                    field: 'city',
                    title: '区域',
                    width:30,
                },{
                    field: 'value',
                    title: '数据',
                    width:30,
                }]
            });
        };
        return oTableInit;
    };
    var oTable_r = new TableInit_center();
    oTable_r.Init();
};