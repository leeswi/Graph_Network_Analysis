setpie("echarts6",1000,250,'#6c7dfc','节点数量');
setpie("echarts7",1000,250,'#fccb00','关系数量');
setpie("echarts8",1000,250,'#62b62f','标签数量');
setpie("echarts3",1000,250,'#6c7dfc','节点数量');
setpie("echarts4",1000,250,'#fccb00','关系数量');
setpie("echarts5",1000,250,'#62b62f','标签数量');

function setpie(echart_id,data_all,data,color,title){
    myChart = echarts.init(document.getElementById(echart_id));
    option = {
        title : {
            text: title,
            x:'center',
            top:"80%",
            textStyle:{
                color: '#ddd',
                fontSize:  14
            }
        },
        series: [{
            type: 'pie',
            radius: ['70%', '80%'],
            center: ['50%','40%'],
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: data,
                name: '女消费',
                itemStyle: {
                    normal: {
                        color: color
                        // color: '#62b62f'
                    }
                },
                label: {
                    normal: {
                        formatter: data + '',
                        textStyle: {
                            fontSize: 16,
                            color: '#fff',
                        }
                    }
                }
            }, {
                value: data_all-data,
                name: '男消费',
                label: {
                    normal: {
                        formatter: function (params) {
                            return '占比' + Math.round(data / data_all * 100) + '%'
                        },
                        textStyle: {
                            color: '#aaa',
                            fontSize: 12
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,255,.2)'
                    },
                    emphasis: {
                        color: '#fff'
                    }
                },
            }]
        }]
    };
    myChart.setOption(option);

}
//弹出框
