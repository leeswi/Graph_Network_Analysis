
function ShowGraph(nodes,edges,keyslist){
	console.log(keyslist);
	var marge = {top:60,bottom:60,left:60,right:60};
	var svg = d3.select("svg");
	var o = document.getElementById("div1");
	var width = (o.clientWidth||o.offsetWidth);
	var u = document.getElementById("div1");
	var height = u.clientHeight||o.offsetHeight;
	var g = svg.append("g")
		.attr("transform","translate("+marge.top+","+marge.left+")");
		
	//准备数据
	var nodes = nodes;
	var edges = edges;
	var labels = []; //获取节点标签
	for(var index in nodes)
	{
		if(labels.indexOf(nodes[index]['label'])==-1)
		{
			labels.push(nodes[index]['label']);
		}
	};

	//设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
	var colorScale = d3.scaleOrdinal()
		.domain(d3.range(labels.length))
		.range(d3.schemeCategory10);

	//标签颜色生成
	var lab_color = {};
	for (var i=0; i<labels.length; i++){
		lab_color[labels[i]]=colorScale(i);
	}
	//新建一个力导向图
	var forceSimulation = d3.forceSimulation()
		.force("link",d3.forceLink().distance(100))
		.force("charge",d3.forceManyBody().strength(-400))
		.force("center",d3.forceCenter());
	//初始化力导向图，也就是传入数据
	//生成节点数据
	forceSimulation.nodes(nodes)
		.on("tick",ticked);//这个函数很重要，后面给出具体实现和说明
	//生成边数据
	forceSimulation.force("link")
		.links(edges)
		.distance(function(d){//每一边的长度
			return 100;
		})    	
	//设置图形的中心位置	
	forceSimulation.force("center")
		.x(width/2*0.9)
		.y(height/2*0.8);
	//在浏览器的控制台输出

	//有了节点和边的数据后，我们开始绘制
	//绘制边
	var links = g.append("g")
		.selectAll("line")
		.data(edges)
		.enter()
		.append("line")
		.attr("stroke","#ddd")
		.attr("stroke-width",1);

	var marker=
		svg.append("marker")   //append 添加标签  attr 添加标签属性
		//.attr("id", function(d) { return d; })
		  .attr("id", "resolved")
		  .attr("markerUnits","strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
		  //.attr("markerUnits","userSpaceOnUse")
		  .attr("viewBox", "0 -5 10 10")//坐标系的区域  viewBox的四个参数分别代表：最小X轴数值；最小y轴数值；宽度；高度。
		  .attr("refX",18)//箭头坐标
		  .attr("refY", 0)
		  .attr("markerWidth", 12)//标识的大小
		  .attr("markerHeight", 12)
		  .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
		  .attr("stroke-width",2)//箭头宽度
		 .append("path")
		  .attr("id","marker_path")
		  .attr("d", "M0,-5 L10,0 L0,5 L5,0")//箭头的路径
		  .attr('fill','#ddd');//箭头颜色

	var linksText = g.append("g")
		.selectAll("text")
		.data(edges)
		.enter()
		.append("text")
		.text(function(d){
			text = d.relation.match(/(?<=:).*?(?={)/);
			return text;
		})
	//绘制节点
	//老规矩，先为节点和节点上的文字分组
	var gs = g.selectAll(".circleText")
		.data(nodes)
		.enter()
		.append("g")
		.attr("transform",function(d,i){
			var cirX = d.x;
			var cirY = d.y;
			return "translate("+cirX+","+cirY+")";
		})
		.call(d3.drag()
			.on("start",started)
			.on("drag",dragged)
			.on("end",ended)
		);
		
	//绘制节点
	gs.append("circle")
		.attr("r",10)
		.attr("fill",function(d){
			return lab_color[d.label];
		})
		.on("dblclick", function(d,i){
			var l = d.label.split(":")[1];
			var key;
			for(let i of keyslist){
                if(l == i.labels){
					if(i.main_key){key = i.main_key}
					else if(i.second_key){key = i.second_key}
					else{key='name'}
					break;
				}
            }
            var content = d[key];
			if(l && key && content) {
                d3_Searchmore(l, key, content);
            }else{
				alert('unknown error');
			}
         })
	;
	//文字
	gs.append("text")
		.attr("x",-10)
		.attr("y",-20)
		.attr("dy",10)
		.text(function(d){
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
		})

	function ticked(){
		links
			.attr("x1",function(d){return d.source.x;})
			.attr("y1",function(d){return d.source.y;})
			.attr("x2",function(d){return d.target.x;})
			.attr("y2",function(d){return d.target.y;})
			.attr("marker-end", "url(#resolved)");
			
		linksText
			.attr("x",function(d){
			return (d.source.x+d.target.x)/2;
		})
			.attr("y",function(d){
			return (d.source.y+d.target.y)/2;
		});
			
		gs.attr("transform",function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	}
	function started(d){
		if(!d3.event.active){
			forceSimulation.alphaTarget(0.8).restart();
		}
		d.fx = d.x;
		d.fy = d.y;
	}
	function dragged(d){
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}
	function ended(d){
		if(!d3.event.active){
			forceSimulation.alphaTarget(0);
		}
		d.fx = null;
		d.fy = null;
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
};

function d3_Searchmore(label,key,content) {
    var index = key;
    var label= label;
    var content = content;
    $.get("search?index=" + encodeURIComponent(index)+"&label="+encodeURIComponent(label)+"&content="+encodeURIComponent(content),
        function (data) {
            var t = $("table#more tbody").empty();
            if (!data || data.length == 0) {
                $("<tr><td class = 'unit' id = 'result_'>" + "没有要查询的内容！" + "</td></tr>").appendTo(t)
                return;
            }
            var content = data[2][0]['pro'];
            for(var key in content){
                $("<tr><td>"+key+"</td><td>"+content[key]+"</td></tr>").appendTo(t);
            }
        },"json");
}