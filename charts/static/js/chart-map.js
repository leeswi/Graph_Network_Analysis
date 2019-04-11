var myChart = echarts.init(document.getElementById('chart4'));
function initChina(data){
    var pre_data = [
        {name: '北京',value: Math.round(Math.random()*2000)},
        {name: '天津',value: Math.round(Math.random()*2000)},
        {name: '上海',value: Math.round(Math.random()*2000)},
        {name: '重庆',value: Math.round(Math.random()*2000)},
        {name: '河北',value: 0},
        {name: '河南',value: Math.round(Math.random()*2000)},
        {name: '云南',value: 5},
        {name: '辽宁',value: 305},
        {name: '黑龙江',value: Math.round(Math.random()*2000)},
        {name: '湖南',value: 200},
        {name: '安徽',value: Math.round(Math.random()*2000)},
        {name: '山东',value: Math.round(Math.random()*2000)},
        {name: '新疆',value: Math.round(Math.random()*2000)},
        {name: '江苏',value: Math.round(Math.random()*2000)},
        {name: '浙江',value: Math.round(Math.random()*2000)},
        {name: '江西',value: Math.round(Math.random()*2000)},
        {name: '湖北',value: Math.round(Math.random()*2000)},
        {name: '广西',value: Math.round(Math.random()*2000)},
        {name: '甘肃',value: Math.round(Math.random()*2000)},
        {name: '山西',value: Math.round(Math.random()*2000)},
        {name: '内蒙古',value: Math.round(Math.random()*2000)},
        {name: '陕西',value: Math.round(Math.random()*2000)},
        {name: '吉林',value: Math.round(Math.random()*2000)},
        {name: '福建',value: Math.round(Math.random()*2000)},
        {name: '贵州',value: Math.round(Math.random()*2000)},
        {name: '广东',value: Math.round(Math.random()*2000)},
        {name: '青海',value: Math.round(Math.random()*2000)},
        {name: '西藏',value: Math.round(Math.random()*2000)},
        {name: '四川',value: Math.round(Math.random()*2000)},
        {name: '宁夏',value: Math.round(Math.random()*2000)},
        {name: '海南',value: Math.round(Math.random()*2000)},
        {name: '台湾',value: Math.round(Math.random()*2000)},
        {name: '香港',value: Math.round(Math.random()*2000)},
        {name: '澳门',value: Math.round(Math.random()*2000)}
    ];
    if(typeof(data) == "undefined"){data = pre_data;}
    var option = {
        title : {
            // text: '订单量',
            // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : { //提示框组件。
            trigger: 'item' //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        },
        legend: {
            orient: 'horizontal', //图例的排列方向
            x:'left', //图例的位置
            data:['统计量']
        },

        visualMap: {//颜色的设置  dataRange
            x: 'left',
            y: 'center',
            splitList: [
                {start: 1500},
                {start: 900, end: 1500},
                {start: 310, end: 1000},
                {start: 200, end: 310},
                {start: 10, end: 200, label: '10 到 200（自定义label）'},
                {start: 5, end: 5, label: '5（自定义特殊颜色）', color: '#077FBA'},
                {end: 10}
            ],
//            min: 0,
//            max: 2500,
//            calculable : true,//颜色呈条状
            text:['高','低'],// 文本，默认为数值文本
            // color: ['#E0022B', '#E09107', '#A3E00B']
            color: ['#C1D3E3', '#077FBA', '#C9514C']
        },
        toolbox: {//工具栏
            show: false,
            orient : 'vertical',//工具栏 icon 的布局朝向
            x: 'right',
            y: 'center',
            feature : {//各工具配置项。
                mark : {show: true},
                dataView : {show: true, readOnly: false},//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
                restore : {show: true},//配置项还原。
                saveAsImage : {show: true}//保存为图片。
            }
        },
        roamController: {//控制地图的上下左右放大缩小 图上没有显示
            show: true,
            x: 'right',
            mapTypeControl: {
                'china': true
            }
        },
        series : [
            {
                name: '统计量',
                type: 'map',
                mapType: 'china',
                roam: true,//是否开启鼠标缩放和平移漫游
                itemStyle:{//地图区域的多边形 图形样式
                    normal:{//是图形在默认状态下的样式
                        label:{
                            show:false,//是否显示标签
                            textStyle: {
                                color: "rgb(249, 249, 249)"
                            }
                        }
                    },
                    emphasis:{//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                        label:{show:true}
                    }
                },
                top:"3%",//组件距离容器的距离
                data:data,
            }
        ]
    };
    myChart.setOption(option);
}
initChina();

myChart.on('mouseover', function (params) {
    var dataIndex = params.dataIndex;
    // console.log(params);
});

function initEcharts(pName){
    var myChart1 = echarts.init(document.getElementById('chart4'));
    var option = {
        title : {
            // text: '订单量',
            // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {//提示框组件。
            trigger: 'item'//数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        },
        legend: {
            show: false,
            orient: 'horizontal',//图例的排列方向
            x:'left',//图例的位置
            data:['统计量']
        },

        visualMap: {//颜色的设置  dataRange
            x: 'left',
            y: 'center',
            // splitList: [
            //     {start: 1500},
            //     {start: 900, end: 1500},
            //     {start: 310, end: 1000},
            //     {start: 200, end: 300},
            //     {start: 10, end: 200, label: '10 到 200（自定义label）'},
            //     {start: 5, end: 5, label: '5（自定义特殊颜色）', color: '#077FBA'},
            //     {end: 10}
            // ],
//            min: 0,
//            max: 2500,
            calculable : true,//颜色呈条状
            text:['高','低'],// 文本，默认为数值文本
            // color: ['#E0022B', '#E09107', '#A3E00B']
            color: ['#C54B47','#E87A5C', '#E4C559', '#8FB95C','#59B0CA','#037AB5','#C2CCD5']
        },
        toolbox: {//工具栏
            show: true,
            orient : 'vertical',//工具栏 icon 的布局朝向
            x: 'right',
            y: 'center',
            feature : {//各工具配置项。
                mark : {show: true},
                dataView : {show: true, readOnly: false},//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
                restore : {show: true},//配置项还原。
                saveAsImage : {show: true}//保存为图片。
            }
        },
        roamController: {//控制地图的上下左右放大缩小 图上没有显示
            show: true,
            x: 'right',
            mapTypeControl: {
                'china': true
            }
        },
        series : [
            {
                name: '统计量',
                type: 'map',
                mapType: pName,
                roam: false,//是否开启鼠标缩放和平移漫游
                itemStyle:{//地图区域的多边形 图形样式
                    normal:{//是图形在默认状态下的样式
                        label:{
                            show:false,//是否显示标签
                            textStyle: {
                                color: "rgb(249, 249, 249)"
                            }
                        }
                    },
                    emphasis:{//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                        label:{show:false}
                    }
                },
                top:"3%",//组件距离容器的距离

            }
        ]
    };
    myChart1.setOption(option);
    myChart1.on('click', function (param) {
        get_GPS();
    });
}


//定义全国省份的数组
var provinces = ['shanghai', 'hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','sichuan','guizhou','yunnan','xizang','shanxi1','gansu','qinghai','ningxia','xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan'];

var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林','黑龙江',  '江苏', '浙江', '安徽', '福建', '江西', '山东','河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'];

myChart.on('click', function (param) {
    // alert(param.name);
    //遍历取到provincesText 中的下标  去拿到对应的省js
    for(var  i= 0 ; i < provincesText.length ; i++ ){
        if(param.name == provincesText[i]){
            //显示对应省份的方法
            // showProvince(provinces[i]) ;
            showProvince(provinces[i],provincesText[i]);
            break ;
        }
    }
});


//展示对应的省
// showprovince（province[i],provinceText[i])改成这样，function（pName,Chinese_）{}
function  showProvince(pName, Chinese_){

    //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
    loadBdScript('$'+pName+'JS','../static/js/province/'+pName+'.js',function(){
    //初始化echarts:具体代码参考上面初始化中国地图即可，这里不再重复。
    initEcharts(Chinese_) ;

    });
}

//加载对应的JS
function loadBdScript(scriptId, url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    script.id = scriptId;
    document.getElementsByTagName("head")[0].appendChild(script);
};

//右下角太阳图
function loadsun(data){
    var myCharts = echarts.init(document.getElementById('sun'));
    var option = {
        title: {
            text: '地理分布数据统计图',
            x:'20',
            y:'0',
            textStyle: {
                fontSize: 16,
                color: '#fff'
            }
        },
        series: {
            type: 'sunburst',
            center: ['50%', '50%'],
            radius: [0, '95%'],  //旭日图的半径
            levels: [{},{
                r0: '10%',
                r: '35%',
                itemStyle: {
                    borderWidth: 2
                }
            },{
                r0: '35%',
                r: '70%',
                label: {
                    align: 'right'
                }
            },{
                r0: '70%',
                r: '72%',
                label: {
                    position: 'outside',
                    padding: 3,
                    silent: false
                },
                itemStyle: {
                    borderWidth: 3
                }
            }],
            data: data
        }
    };
    myCharts.setOption(option);
}

//随机颜色生成
function getColorRandom(){  
    var c="#";  
    var cArray=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];  
    for(var i=0;i<6;i++){  
        var  cIndex= Math.round(Math.random()*15);  
        c+=cArray[cIndex];  
    }  
return c;  
}  

//太阳图数据提取
function get_sun(){
    var label = $("#node-label-center option:selected").val();
    var longitude = $("#node-property-longitude option:selected").val();
    var latitude = $("#node-property-latitude option:selected").val();
    var city = $("#node-property-city option:selected").val();
    var data = $("#node-property-data option:selected").val();
    $.ajax({
        type : "POST",
        url : "GetSun",
        data : {'label':label,'longitude':longitude,'latitude':latitude,'city':city,'data':data},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            if(msg==0){alert('映射表无记录！');return}
            if(msg==-1){alert('查询参数错误，请重新输入！');return}
            model_data = data_to_sun(msg);
            loadsun(model_data);
        },
        error:function(){
            alert("错误");
        }
    });
}

function get_GPS(){
    var label = $("#node-label-center option:selected").val();
    var longitude = $("#node-property-longitude option:selected").val();
    var latitude = $("#node-property-latitude option:selected").val();
    var city = $("#node-property-city option:selected").val();
    var data = $("#node-property-data option:selected").val();
    $.ajax({
        type : "POST",
        url : "GetGPS",
        data : {'label':label,'longitude':longitude,'latitude':latitude,'city':city,'data':data},
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        success : function (msg) {
            if(msg==0){alert('映射表无记录！');return}
            if(msg==-1){alert('查询参数错误，请重新输入！');return}
            map_data = data_to_map(msg);
            initChina(map_data);
        },
        error:function(){
            alert("错误");
        }
    });
}

////数据库提取原始数据转换成地图数据格式
function data_to_map(raw_data) {
    var model_data = [];
    for(let i in raw_data){
        var temp = {};
        temp['name'] = i;
        temp['value'] = raw_data[i];
        model_data.push(temp);
    }
    console.log(model_data);
    return model_data
}

//数据库提取原始数据转换成太阳图数据格式
function data_to_sun(raw_data){
    var data = [{
            name: '东部战区',
            children: [{
                name: '江苏',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '浙江',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '安徽',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '福建',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '江西',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '上海',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            }]
        }, {
            name: '南部战区',
            children: [{
                name: '广东',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '广西',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '海南',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '云南',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '湖南',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '贵州',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            }]
        }, {
            name: '西部战区',
            children: [{
                name: '四川',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '甘肃',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '青海',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '宁夏',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '新疆',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '西藏',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '重庆',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            }]
        }, {
            name: '中部战区',
            children: [{
                name: '北京',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '天津',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '河北',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '河南',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '山西',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '陕西',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '湖北',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            }]
        }, {
            name: '北部战区',
            children: [{
                name: '辽宁',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '山东',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '吉林',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '黑龙江',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            },{
                name: '内蒙古',
                itemStyle: {
                    color: getColorRandom()
                },
                children: [{
                    name: '10',
                    value: 10,
                }]
            }]
        },];
    for(let i in data){
        zhanqu = data[i]['children'];
        for(let j in zhanqu){
            province_name = zhanqu[j]['name'];
            data[i]['children'][j]['children'][0]['name']=raw_data[province_name].toString() ;
            data[i]['children'][j]['children'][0]['value']=raw_data[province_name];
        }
    }
    return data;
}