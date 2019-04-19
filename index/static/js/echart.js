$(function () {
    echart_map();

    // echart_map
    function echart_map() {
        // 基于准备好的dom，初始化echarts实例
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        var geoCoordMap = {
            '上海': [121.4648,31.2891],
            '东莞': [113.8953,22.901],
            '东营': [118.7073,37.5513],
            '中山': [113.4229,22.478],
            '临汾': [111.4783,36.1615],
            '临沂': [118.3118,35.2936],
            '丹东': [124.541,40.4242],
            '丽水': [119.5642,28.1854],
            '乌鲁木齐': [87.9236,43.5883],
            '佛山': [112.8955,23.1097],
            '保定': [115.0488,39.0948],
            '兰州': [103.5901,36.3043],
            '包头': [110.3467,41.4899],
            '北京': [116.4551,40.2539],
            '北海': [109.314,21.6211],
            '南京': [118.8062,31.9208],
            '南宁': [108.479,23.1152],
            '南昌': [116.0046,28.6633],
            '南通': [121.1023,32.1625],
            '厦门': [118.1689,24.6478],
            '台州': [121.1353,28.6688],
            '合肥': [117.29,32.0581],
            '呼和浩特': [111.4124,40.4901],
            '咸阳': [108.4131,34.8706],
            '哈尔滨': [127.9688,45.368],
            '唐山': [118.4766,39.6826],
            '嘉兴': [120.9155,30.6354],
            '大同': [113.7854,39.8035],
            '大连': [122.2229,39.4409],
            '天津': [117.4219,39.4189],
            '太原': [112.3352,37.9413],
            '威海': [121.9482,37.1393],
            '宁波': [121.5967,29.6466],
            '宝鸡': [107.1826,34.3433],
            '宿迁': [118.5535,33.7775],
            '常州': [119.4543,31.5582],
            '广州': [113.5107,23.2196],
            '廊坊': [116.521,39.0509],
            '延安': [109.1052,36.4252],
            '张家口': [115.1477,40.8527],
            '徐州': [117.5208,34.3268],
            '德州': [116.6858,37.2107],
            '惠州': [114.6204,23.1647],
            '成都': [103.9526,30.7617],
            '扬州': [119.4653,32.8162],
            '承德': [117.5757,41.4075],
            '拉萨': [91.1865,30.1465],
            '无锡': [120.3442,31.5527],
            '日照': [119.2786,35.5023],
            '昆明': [102.9199,25.4663],
            '杭州': [119.5313,29.8773],
            '枣庄': [117.323,34.8926],
            '柳州': [109.3799,24.9774],
            '株洲': [113.5327,27.0319],
            '武汉': [114.3896,30.6628],
            '汕头': [117.1692,23.3405],
            '江门': [112.6318,22.1484],
            '沈阳': [123.1238,42.1216],
            '沧州': [116.8286,38.2104],
            '河源': [114.917,23.9722],
            '泉州': [118.3228,25.1147],
            '泰安': [117.0264,36.0516],
            '泰州': [120.0586,32.5525],
            '济南': [117.1582,36.8701],
            '济宁': [116.8286,35.3375],
            '海口': [110.3893,19.8516],
            '淄博': [118.0371,36.6064],
            '淮安': [118.927,33.4039],
            '深圳': [114.5435,22.5439],
            '清远': [112.9175,24.3292],
            '温州': [120.498,27.8119],
            '渭南': [109.7864,35.0299],
            '湖州': [119.8608,30.7782],
            '湘潭': [112.5439,27.7075],
            '滨州': [117.8174,37.4963],
            '潍坊': [119.0918,36.524],
            '烟台': [120.7397,37.5128],
            '玉溪': [101.9312,23.8898],
            '珠海': [113.7305,22.1155],
            '盐城': [120.2234,33.5577],
            '盘锦': [121.9482,41.0449],
            '石家庄': [114.4995,38.1006],
            '福州': [119.4543,25.9222],
            '秦皇岛': [119.2126,40.0232],
            '绍兴': [120.564,29.7565],
            '聊城': [115.9167,36.4032],
            '肇庆': [112.1265,23.5822],
            '舟山': [122.2559,30.2234],
            '苏州': [120.6519,31.3989],
            '莱芜': [117.6526,36.2714],
            '菏泽': [115.6201,35.2057],
            '营口': [122.4316,40.4297],
            '葫芦岛': [120.1575,40.578],
            '衡水': [115.8838,37.7161],
            '衢州': [118.6853,28.8666],
            '西宁': [101.4038,36.8207],
            '西安': [109.1162,34.2004],
            '贵阳': [106.6992,26.7682],
            '连云港': [119.1248,34.552],
            '邢台': [114.8071,37.2821],
            '邯郸': [114.4775,36.535],
            '郑州': [113.4668,34.6234],
            '鄂尔多斯': [108.9734,39.2487],
            '重庆': [107.7539,30.1904],
            '金华': [120.0037,29.1028],
            '铜川': [109.0393,35.1947],
            '银川': [106.3586,38.1775],
            '镇江': [119.4763,31.9702],
            '长春': [125.8154,44.2584],
            '长沙': [113.0823,28.2568],
            '长治': [112.8625,36.4746],
            '阳泉': [113.4778,38.0951],
            '青岛': [120.4651,36.3373],
            '韶关': [113.7964,24.7028]
        };

        var BJData = [
            [{name:'北京'}, {name:'上海',value:95}],
            [{name:'北京'}, {name:'广州',value:90}],
            [{name:'北京'}, {name:'西宁',value:80}],
            [{name:'北京'}, {name:'南宁',value:70}],
            [{name:'北京'}, {name:'南昌',value:60}],
            [{name:'北京'}, {name:'拉萨',value:50}],
            [{name:'北京'}, {name:'天津',value:40}],
            [{name:'北京'}, {name:'乌鲁木齐',value:30}],
            [{name:'北京'}, {name:'厦门',value:20}],
            [{name:'北京'}, {name:'常州',value:10}]
        ];

        var SHData = [
            [{name:'上海'},{name:'包头',value:95}],
            [{name:'上海'},{name:'昆明',value:90}],
            [{name:'上海'},{name:'广州',value:80}],
            [{name:'上海'},{name:'郑州',value:70}],
            [{name:'上海'},{name:'哈尔滨',value:60}],
            [{name:'上海'},{name:'重庆',value:50}],
            [{name:'上海'},{name:'长沙',value:40}],
            [{name:'上海'},{name:'北京',value:30}],
            [{name:'上海'},{name:'丹东',value:20}]
        ];

        var GZData = [
            [{name:'广州'},{name:'福州',value:95}],
            [{name:'广州'},{name:'太原',value:90}],
            [{name:'广州'},{name:'长春',value:80}],
            [{name:'广州'},{name:'大同',value:70}],
            [{name:'广州'},{name:'西安',value:60}],
            [{name:'广州'},{name:'成都',value:50}],
            [{name:'广州'},{name:'常州',value:40}],
            [{name:'广州'},{name:'北京',value:30}],
            [{name:'广州'},{name:'北海',value:20}],
            [{name:'广州'},{name:'海口',value:10}]
        ];

        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };

        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        var series = [];
        [['北京', BJData], ['上海', SHData], ['广州', GZData]].forEach(function (item, i) {
            series.push({
                    name: item[0] + ' Top10',
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#fff',
                        symbolSize: 3
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                },
                {
                    name: item[0] + ' Top10',
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        //show: true,
                        //period: 6,
                        //trailLength: 0,
                        //symbol: planePath,
                        //symbolSize: 55
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 1,
                            opacity: 0.4,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                },
                {
                    name: item[0] + ' Top10',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: function (val) {
                        return val[2] / 8;
                    },
                    itemStyle: {
                        normal: {
                            color: color[i]
                        }
                    },
                    data: item[1].map(function (dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                        };
                    })
                });
        });

        option = {
            backgroundColor: '',
            title : {
                text: '',
                //subtext: '数据覆盖率',
                left: 'center',
                textStyle : {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                //data:['北京 Top10', '上海 Top10', '广州 Top10'],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'single'
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {//选取前颜色
                        areaColor: 'black',
                        borderColor: '#fff'
                    },
                    emphasis: {//选取后颜色
                        areaColor: 'black'
                    }
                }
            },
            series: series
        };;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

    }

    //echart_3
    function echart_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_3'));
        option = {
            // legend: {
            //     data: ['图一','图二', '张三', '李四']
            // },
            radar: [
                {
                    indicator: [
                        { text: '指标一' },
                        { text: '指标二' },
                        { text: '指标三' },
                        { text: '指标四' },
                        { text: '指标五' }
                    ],
                    center: ['50%', '50%'],
                    radius: 80,
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    name: {
                        formatter:'【{value}】',
                        textStyle: {
                            color:'#72ACD1'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(114, 172, 209, 0.2)',
                            'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                            'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '雷达图',
                    type: 'radar',
                    itemStyle: {
                        emphasis: {
                            // color: 各异,
                            lineStyle: {
                                width: 4
                            }
                        }
                    },
                    data: [
                        {
                            value: [100, 8, 0.40, -80, 2000],
                            name: '图一',
                            symbol: 'rect',
                            symbolSize: 5,
                            lineStyle: {
                                normal: {
                                    type: 'dashed'
                                }
                            }
                        },
                        {
                            value: [60, 5, 0.30, -100, 1500],
                            name: '图二',
                            areaStyle: {
                                normal: {
                                    color: 'rgba(255, 255, 255, 0.5)'
                                }
                            }
                        }
                    ]
                }
            ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

})
//echart_1
function echart_1(data,counts) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_1'));

    var data = data;

    var colors=new Array();
    for(var j=0;j<counts;j++){
        //生成随机颜色  
        function getColorRandom(){  
            var c="#";  
            var cArray=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];  
            for(var i=0;i<6;i++){  
                var  cIndex= Math.round(Math.random()*15);  
                c+=cArray[cIndex];  
            }  
        return c;  
        }  
        colors.push(getColorRandom());
    }

    option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        colors:colors,

        series: [{
            name: '标签类型',
            type: 'pie',
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            center: ['50%', '50%'], //饼图的中心（圆心）坐标
            radius: [80, 110], //饼图的半径
            avoidLabelOverlap: true, ////是否启用防止标签重叠
            itemStyle: { //图形样式
                normal: {
                    borderColor: '#1e2239',
                    borderWidth: 1.5,
                },
            },

            label: { //标签的位置
                normal: {
                    show: false,
                    position: 'inside', //标签的位置
                    formatter: "{d}%",
                    textStyle: {
                        color: '#fff',
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontWeight: 'bold'
                    }
                }
            },
            data: data
        }, {
            name: '',
            type: 'pie',
            clockwise: false,
            silent: true,
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            center: ['50%', '50%'], //饼图的中心（圆心）坐标
            radius: [0, 70], //饼图的半径
            itemStyle: { //图形样式
                normal: {
                    borderColor: '#1e2239',
                    borderWidth: 1.5,
                    opacity: 0.21,
                }
            },
            label: { //标签的位置
                normal: {
                    show: false,
                }
            },
            data: data
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

function choose(label) {
    $('.layouts').show();
    var layoutTitle = '选择数据源';
    $('.title').text(layoutTitle);
    var checkboxWrap = [];
    for (var j = 0; j < label.length; j++) {
        checkboxWrap.push('<label><input type="checkbox" name="labels" value="'+label[j].name+'">' +label[j].name+'</span></label>')
    }
    $('.checkboxwrapper').html(checkboxWrap.join(""));
}
function sureBtn(data) {
    var zhi = [];
    var $checked = $('.checkboxwrapper input[type=checkbox]:checked');
    var chsLength = $checked.length;
    if(chsLength<3 || chsLength>5){
        alert("请选择3-5个数据源！")
    }else {
        for (var i = 0; i < chsLength; i++) {
            zhi.push($checked.eq(i).val());
        }
        $('.layouts').hide();
        echart_4(zhi,data);
    }
}
function delBtn(){
    $('.layouts').hide();
}


function echart_2(label,keyslist) {
    var main_key='';
    for(let i in keyslist){
        if(keyslist[i].pk==label){
            if(keyslist[i].fields['main_key']){
                main_key = keyslist[i].fields['main_key'];
                break;
            }else if(keyslist[i].fields['second_key']){
                main_key = keyslist[i].fields['second_key'];
                break;
            }
        }
    }
    if(main_key==""){
        main_key='name'
    }
    if(label){
        $.ajax({
            url : "/network/pagerank",
            type : "POST",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            data : {'label':label},
            dataType : "json",
            success : function(result) {
                var t = $("table#more tbody").empty();
                result.sort(function(a,b){
                   if(a.score<b.score){
                       return 1;
                   }
                   if(a.score>b.score){
                       return -1;
                   }
                   return 0
                });
                for(var key in result){
                    $("<tr><td class='main_key'>"+result[key].node[main_key]+"</td><td>"+(result[key].score).toFixed(3)+"</td></tr>").appendTo(t);
                    if(key==4){
                        break;
                    }
                }
            },
            error:function(msg){
                console.log("error"+msg);
            }
        })
    }
}

function echart_4(checked,datas){
    var datas_=[];
    if(checked==""){
        checked = ["Loc","Airport","Classroom","Course","State"];
    }
    for(var i in checked){
        for(var j in datas){
            if(datas[j].name==checked[i]){
                datas_.push(datas[j].value);
            }
        }
    }
    var myChart = echarts.init(document.getElementById('chart4'));
    window.addEventListener('resize', function () {
        myChart.resize();
    });
    var option = {
      // ---  提示框 ----
      tooltip: {
        show: true,   // 是否显示提示框，默认为true
        trigger: 'item', // 数据项图形触发
        axisPointer: {   // 指示样式
          type: 'shadow',
          axis: 'auto'
        },
        padding: 5,
        textStyle: {   // 提示框内容的样式
          color: '#fff'
        }
      },
      // ---- gird区域 ---
      grid: {
        show: false,    // 是否显示直角坐标系网格
        top: "12%",  // 相对位置 top\bottom\left\right
        bottom: '2%',
        containLabel: true, // gird 区域是否包含坐标轴的刻度标签
        tooltip: {
          show: true,
          trigger: 'item',   // 触发类型
          textStyle: {
            color: '#666'
          }
        }
      },
      //  ------  X轴 ------
      xAxis: {
        show: true,  // 是否显示
        position: 'bottom',  // x轴的位置
        offset: 0, // x轴相对于默认位置的偏移
        type: 'category',   // 轴类型， 默认为 'category'
        name: '',    // 轴名称
        nameLocation: 'end',  // 轴名称相对位置
        nameTextStyle: {   // 坐标轴名称样式
          color: 'white',
          padding: [5, 0, 0, -5]
        },
        nameGap: 15, // 坐标轴名称与轴线之间的距离
        nameRotate: 0,  // 坐标轴名字旋转
        axisLine: {       // 坐标轴 轴线
          show: true,  // 是否显示
          // ------   线 ---------
          lineStyle: {
            color: 'grey',
            width: 1,
            type: 'solid'
          }
        },
        axisTick: {    // 坐标轴 刻度
          show: false,  // 是否显示
          inside: true,  // 是否朝内
          length: 3,     // 长度
          lineStyle: {   // 默认取轴线的样式
            color: 'red',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {    // 坐标轴标签
          show: true,  // 是否显示
          inside: false, // 是否朝内
          rotate: 45, // 旋转角度
          margin: 5, // 刻度标签与轴线之间的距离
          interval:0,
          color: 'white'  // 默认取轴线的颜色
        },
        splitLine: {    // gird区域中的分割线
          show: false,  // 是否显示
          lineStyle: {
            // color: 'red',
            // width: 1,
            // type: 'solid'
          }
        },
        splitArea: {    // 网格区域
          show: false  // 是否显示，默认为false
        },
        data : checked
      },
      //   ------   y轴  ----------
      yAxis: {
        show: true,  // 是否显示
        position: 'left', // y轴位置
        offset: 0, // y轴相对于默认位置的偏移
        type: 'value',  // 轴类型，默认为 ‘category’
          name:'数量',
        nameLocation: 'end', // 轴名称相对位置value
        nameTextStyle: {    // 坐标轴名称样式
          color: 'white',
            fontSize: 8,
        },
        nameGap: 0, // 坐标轴名称与轴线之间的距离
        nameRotate:0,  // 坐标轴名字旋转

        axisLine: {    // 坐标轴 轴线
          show: true,  // 是否显示
          lineStyle: {
            color: 'grey',
            width: 1,
            type: 'solid'
          }
        },
        axisTick: {      // 坐标轴的刻度
          show: false,    // 是否显示
          inside: true,  // 是否朝内
          length: 3,      // 长度
          lineStyle: {
            color: 'white',  // 默认取轴线的颜色
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {      // 坐标轴的标签
          show: true,    // 是否显示
          inside: false,  // 是否朝内
          rotate: 0,     // 旋转角度
          margin: 8,     // 刻度标签与轴线之间的距离
          color: 'white',  // 默认轴线的颜色
        },
        splitLine: {    // gird 区域中的分割线
          show: true,   // 是否显示
          lineStyle: {
            color: '#666',
            width: 1,
            type: 'dashed'
          }
        },
        splitArea: {     // 网格区域
          show: false   // 是否显示，默认为false
        }
      },
      //  -------   内容数据 -------
      series: [
        {
          name: '销量',      // 序列名称
          type: 'bar',      // 类型
          legendHoverLink: true,  // 是否启用图列 hover 时的联动高亮
          label: {   // 图形上的文本标签
            show: true,
            position: 'top', // 相对位置
            rotate: 0,  // 旋转角度
            color: '#eee'
          },
          itemStyle: {    // 图形的形状
            color: 'yellow',
            normal:{
              color:function(params) {
                  var colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3'];
                  return colorList[params.dataIndex]
              },
                label:{
                  position: 'top',
                    color: 'white',
                  show: true
                },
          },
            barBorderRadius: [18, 18, 0 ,0]
          },
          barWidth: 15,  // 柱形的宽度
          barCategoryGap: '15%',  // 柱形的间距
          data: datas_
        }
      ]
    };
    myChart.clear();
    myChart.setOption(option);
}
function getLouvai(){
    $.ajax({
        type: "GET",
        url: "/network/getLouvai",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 50000,
        cache: true,
        async: true,
        success: function (data) {
            $("#Louvai").text(data);
        },
        error: function (err) {
            console.log("error" + err);
        }
    });
}