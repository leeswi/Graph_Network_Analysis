function find() {
    $("#results").bootstrapTable('destroy');
    $("#deepsearch").hide();
    $("#btable").show();

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
};
var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#results').bootstrapTable({
            url: 'find',         //请求后台的URL（*）
            method: 'POST',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            contentType : "application/x-www-form-urlencoded",
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 8,                       //每页的记录行数（*）
            search: false,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 1,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                field: "labels",
                title: '搜索结果',
                width: 80,
            },{
                field: "key",
                title: '属性',
            }],
            onClickRow: function (row) {
                SearchMore(row)
            }
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            query: $("#search").find("input[name=search]").val(),
            label: $('#select_data_1 option:selected').text(),
            key: document.getElementById("local_object_data_").value,
            deepth: document.getElementById("deepth").value,
        };
        return temp;
    };
    initTableHeight();
    return oTableInit;
};

function initTableHeight(){
    var panelH = document.getElementById("dataAllBorder02");
    var h0 = panelH.clientHeight||panelH.offsetHeight;
    var o1 = document.getElementById("local_object_data");
    var h1 = o1.clientHeight||o1.offsetHeight;
    var o2 = document.getElementById("deepsearch");
    var h2 = o2.clientHeight||o2.offsetHeight;
    var height = h0-h1-h2-100;
    $(".panel1").css({"height": height});
}

var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};
    oInit.Init = function () {
        //初始化页面上面的按钮事件
    };
    return oInit;
};

