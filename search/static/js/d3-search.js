$("#cus_ser .close").click(function(){
    $("#cus_ser").css({
        display: 'none'
    });
});

$("#cus_ser").mouseover(function(){
    $(this).stop();
    $(this).animate({width: 165},400,'swing');
});

$("#cus_ser").mouseout(function(){
    $("#cus_ser").stop();
    $("#cus_ser").animate({width:32},400, 'swing');
});
function ShowGraph(nodes,edges,keyslist){
	//设置区域
	var marge = {top:60,bottom:60,left:60,right:60};
	var svg = d3.select("#div1");
	var svgL = d3.select("#div0");
	var o = document.getElementById("div1");
	var width = (o.clientWidth||o.offsetWidth);
	// var width = 900;
	var u = document.getElementById("div1");
	var height = u.clientHeight||o.offsetHeight;
	// var height = 700;
	svg.attr('width', width).attr('height', height)

	.call(d3.zoom() //创建缩放行为
            .scaleExtent([-5, 2])
            .on('zoom',zoom_actions))
	.on('dblclick.zoom', null);
	//准备数据
	var nodes = nodes;
	var links = edges;
	var labels = [];
	for(var index in nodes)
	{
		if(labels.indexOf(nodes[index]['label'])==-1)
		{
			labels.push(nodes[index]['label']);
		}
	};
	//设置颜色
	var colorScale = d3.scaleOrdinal()
		.domain(d3.range(labels.length))
		.range(d3.schemeCategory10);
	var lab_color = {};
	for (var i=0; i<labels.length; i++){
		lab_color[labels[i]]=colorScale(i);
	}
	//初始化力学仿真器，通过布局函数格式化数据
	var simulation = d3.forceSimulation(d3.values(nodes))
		.force("link", d3.forceLink(links).distance(100))   //distance设置连线距离
		.force('collision', d3.forceCollide(1).strength(0.1))
		.force("charge", d3.forceManyBody().strength(-300))  //注1>
		.force("center", d3.forceCenter(width/2*0.9, height/2*0.8))  //设置力学仿真器的中心
		.on("tick", ticked);

	//图参数
	$('#r1').on('input', function()
	{
		var distance = $("#r1").val();
		simulation.force("link")  //弹簧力
			.links(edges)
			.distance(distance);
		simulation.alphaTarget(0.8).restart();
	});
	$('#r2').on('input', function()
	{
		var strength = $("#r2").val();
		simulation.force("charge",d3.forceManyBody().strength(strength))//电磁力
		.alphaTarget(0.8)
		.restart();
	});

	$("#r4").click(function(){
		simulation.stop();
	});
	$("#r5").click(function(){
		simulation.restart();
	});
	// $("#r7").click(function(){
		// simulation = d3.forceSimulation(nodes)
			// .force("charge", d3.forceCollide().radius(400))
			// .force("r", d3.forceRadial(400,width/2*0.9, height/2*0.8));
	// })
	var g = svg.append("g")
		.attr("class", "everything");
	var gL = svgL.append("g");
	// 绘制连线
    var svg_links = g.append('g')
		.selectAll("line")
		.data(links)
		.enter()
		.append("line")
		.style("stroke", "#ddd")
		.style("stroke-width", 1);

	//绘制连线文字
	var svg_linksText = g.append("g")
		.selectAll("text")
		.data(links)
		.enter()
		.append("text")
		.attr("class","linkText")
		.text(function(d){
			text = d.relation.match(/(?<=:).*?(?={)/);
			return text;
		});
	// 绘制节点
    var svg_nodes = g.append('g')
        .selectAll("circle")
        .data(simulation.nodes())
        .enter()
        .append("circle")
        .attr("r", function(d){
			var Degree = degree(links,d);
			var linear = d3.scaleLinear().domain([1,40]).range([8,30]);
			return linear(Degree);
		})
		.style("stroke-width",1)
		.style("fill-opacity",1)
		.style("stroke","#fff")
        .style("fill", function(d){return lab_color[d.label]})
		.call(d3.drag().on("start", dragstarted) //d3.drag() 创建一个拖曳行为
          .on("drag", dragged)
          .on("end", dragended))
		.on("dblclick", lockNode)
        .on("click",function(d){ nodeinfo(d); })
		.on('mouseover', function (d){
			link_hover(d,true);
			d3.select(this).style("stroke-width",2);
		})
		.on('mouseout',function(d){
			link_hover(d,false);
			d3.select(this).style("stroke-width",1);
		});

    //绘制描述节点的文字
    var svg_texts =  g.append('g')
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
		.attr("class","nodeText")
        .style("fill", "white")
		// .attr('text-anchor', 'middle')
        .attr("dx", 20)
        .attr("dy", 8)
        .text(function (d) {
            node_label = d.label;
			node_label = removeEmptyArrayEle(node_label.split(':'));
            for(let i of keyslist){
                if(node_label.includes(i.labels)){
                    var show = i.main_key;
                    var show2 = i.second_key;
                    if(d[show]){return d[show];}
                    if(d[show2]){return d[show2];}
                }
            }
			return "未知节点";
        });
	//绘制箭头
	var svg_marker = g.append("marker")
			.attr("id", "resolved")
			.attr("markerUnits","strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
			//.attr("markerUnits","userSpaceOnUse")
			.attr("viewBox", "0 -5 10 10")//坐标系的区域  viewBox的四个参数分别代表：最小X轴数值；最小y轴数值；宽度；高度。
			.attr("refX",8)//箭头坐标
			.attr("refY", 0)
			.attr("markerWidth", 12)//标识的大小
			.attr("markerHeight", 12)
			.attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
			.attr("stroke-width",2)//箭头宽度
			.append("path")
			.attr("id","marker_path")
			.attr("d", "M0,-5 L10,0 L0,5 L5,0")//箭头的路径
			.attr('fill','#ddd');//箭头颜色
	//图例
	function legend(lab_color) {
		var legend_color = [];
		for(let i in lab_color){
			var temp = {};
			temp["label"]=i;
			temp["color"]=lab_color[i];
			legend_color.push(temp);
		}
		var svg_legend = gL.append('g')
			.selectAll("rect")
			.data(legend_color)
			.enter()
			.append("rect")
			.attr("x", function(d,i){return (i%5)*120+20})
			.attr("y", function(d,i){return parseInt(i/5)*20+20})
			.attr("width",20)
			.attr("height",12)
			.attr("rx",3)
			.attr("ry",3)
			.attr("fill",function(d,i){return d.color})
			.on('wheel.zoom',null);
		var svg_legend_text = gL.append("g")
			.selectAll("text")
			.data(legend_color)
			.enter()
			.append("text")
			.text(function(d){return d.label;})
			.attr("x", function(d,i) {return (i%5)*120+40;})
			.attr("y", function(d,i){return parseInt(i/5)*20+30})
			.on('wheel.zoom',null);
	}
	legend(lab_color);

	// 节点半径参数调节(火狐浏览器出现问题）
	$('#r3').on('input', function()
	{
		var r = $("#r3").val();
		d3.selectAll("circle").style("r",function(d){
			var Degree = degree(links,d);
			var linear = d3.scaleLinear().domain([1,40]).range([8,20]);
			return parseInt(r)*linear(Degree);
		});
		simulation.alphaTarget(0.8).restart();
	});
	$('#r6').on('input', function()
	{
		var opacity = $("#r6").val();
		opacity = parseFloat(opacity)/10;
		d3.selectAll("circle").style("fill-opacity",opacity);
	});
	//监听拖拽开始
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.8).restart(); //alpha是动画的冷却系数，运动过程中会不断减小，直到小于0.005为止，此时动画会停止。
        d.fx = d.x;    //fx为固定坐标，x为初始坐标  注3>
        d.fy = d.y;
    }

    //监听拖拽中
    function dragged(d) {
        d.fx = d3.event.x;  //fevent.x为拖拽移动时的坐标
        d.fy = d3.event.y;
    }

    //监听拖拽结束
    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        if($("#fixLayout").hasClass("switch-on")){
			simulation.stop();
		}
    }

    function zoom_actions() {
        g.attr("transform", d3.event.transform)
    }
	//悬浮连线高亮
	function link_hover(currNode,tag){
		if(tag==true){
			svg_links.style("stroke-width",function(line){
				if(line.target == currNode || line.source == currNode){
					return 1.5;
				}
			});
			svg_links.style("stroke-opacity",function(line){
				if(line.target != currNode && line.source != currNode){
					return 0.3;
				}
			});
		}else{
			svg_links.style("stroke-width",1);
			svg_links.style("stroke-opacity",1)
		}

	}
	// 双击解除锁定状态
	function lockNode(lockNode){
		lockNode.fx = null;
		lockNode.fy = null;
	}
	function nodeinfo(d){
        console.log(d);
        var label = d.label;
        label = label.split(':');
        for(let i in keyslist){
            if(label[1] == keyslist[i].labels){
                key = keyslist[i].main_key;
                break;
            }
        }
        if(key==''){
            alert('未知节点，请完善映射表')
        }else{
            var content = d[key];
            d3_Searchmore(label[1],key,content);
        }
    }
	// 计算节点出入度
	function degree(all_links,source_ndoe){
		var InDegree = 0;
		var OutDegree = 0;
		var s = source_ndoe;
		for(let i in all_links){
			if(all_links[i]['target'] == s){
				InDegree++;
			}
			if(all_links[i]['source'] == s){
				OutDegree++;
			}
		}
		return InDegree+OutDegree;
	}

    //拖拽时的事件监听器  以实时更新坐标
    function ticked() {
        svg_links.attr("x1", function (d) {return d.source.x;})
            .attr("y1", function (d) {return d.source.y;})
            .attr("x2", function (d) {return getTargetNodeCircumferencePoint(d)[0];})
            .attr("y2", function (d) {return getTargetNodeCircumferencePoint(d)[1];})
			.attr("marker-end", "url(#resolved)");
        svg_nodes.attr("cx", function (d) {return d.x;})
            .attr("cy", function (d) {return d.y;});
        svg_texts.attr("x", function (d) {return d.x;})
            .attr("y", function (d) {return d.y;});
		svg_linksText.attr("x",function(d){return (d.source.x+d.target.x)/2;})
			.attr("y",function(d){return (d.source.y+d.target.y)/2;});
    }
	//计算连线终点位置
	function getTargetNodeCircumferencePoint(d){
		var r = $("#r3").val();
		var Degree = degree(links,d.target);
		var linear = d3.scaleLinear().domain([1,40]).range([8,30]);
		var t_radius = parseInt(r)*linear(Degree)+2; // nodeWidth is just a custom attribute I calculate during the creation of the nodes depending on the node width
		var dx = d.target.x - d.source.x;
		var dy = d.target.y - d.source.y;
		var gamma = Math.atan2(dy,dx); // Math.atan2 returns the angle in the correct quadrant as opposed to Math.atan
		var tx = d.target.x - (Math.cos(gamma) * t_radius);
		var ty = d.target.y - (Math.sin(gamma) * t_radius);
		return [tx,ty];
	}
}
function removeEmptyArrayEle(arr){
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == "") {
			arr.splice(i,1);
			i = i - 1;
			}
	}
	return arr;
}

function d3_Searchmore(label,key,content) {
    var index = key;
    var label= label;
    var content = content;
    $.get("search?index=" + encodeURIComponent(index)+"&label="+encodeURIComponent(label)+"&content="+encodeURIComponent(content),
        function (data) {
            var t = $("table#more tbody").empty();
            if (!data || data.length == 0) {
                $("<tr><td class = 'unit' id = 'result_'>" + "没有要查询的内容！" + "</td></tr>").appendTo(t);
                return;
            }
            var content = data[2][0]['pro'];
            for(var key in content){
                $("<tr><td>"+key+"</td><td>"+content[key]+"</td></tr>").appendTo(t);
            }
        },"json");
}

$(function(){
	switchEvent("#nodeText",function(){
		$(".nodeText").show();
	},function(){
		$(".nodeText").hide();
	});
	switchEvent("#linkText",function(){
		$(".linkText").show();
	},function(){
		$(".linkText").hide();
	});
	switchEvent("#fixLayout",function(){
		document.getElementById("r4").click();
	},function(){
		document.getElementById("r5").click();
	});
});