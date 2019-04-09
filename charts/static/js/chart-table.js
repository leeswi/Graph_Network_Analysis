
$(function () {
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
    var oTable_r = new TableInit_right();
    oTable_r.Init();
});

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    var algo= $("#node-algo option:selected").val();
    var label= $("#node-label option:selected").val();
    var link= $("#node-link option:selected").val();

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
                        if(msg==0){alert('映射表无记录！');return}
                        request.success({
                            row : msg
                        });
                        $('#charts_right').bootstrapTable('load', msg);
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
