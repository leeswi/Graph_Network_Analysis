
$(function(){
    getHt();
    initMap();
    mapActive();
    rightChange();
});
//获取div的高度
function getHt(){
   var all_height=$(window).height();
   var div_height=all_height-84;
    $("#car_control").css("height",div_height+"px");
}
//加载地图
function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    // addMarker();//向地图中添加marker
}
function createMap() {
// 百度地图API功能
    var map = new BMap.Map("map_box");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 8);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    window.map = map;//将map变量存储在全局
}
function setMapEvent() {
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}
function addMapControl() {
    var size1 = new BMap.Size(10, 50);
    map.addControl(new BMap.MapTypeControl({
        offset: size1,
        mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP,
        ]
    }));
    map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT}));
}
//标注点数组
// var markerArr = [{"title":"北京北站","content":"我的备注","point":"116.35885|39.949901","isOpen":1,"icon":{w:21,h:21,l:0,t:0,x:6,lb:5},"type":"station"}
// 	 ,{title:"北京西站",content:"我的备注",point:"116.32723|39.901209",isOpen:1,icon:{w:21,h:21,l:0,t:0,x:6,lb:5},type:"station"}
// 	 ,{title:"北京站",content:"我的备注",point:"116.437039|39.913607",isOpen:1,icon:{w:21,h:21,l:0,t:0,x:6,lb:5},type:"station"}
// 	 ,{title:"地坛公园",content:"我的备注",point:"116.422666|39.960521",isOpen:1,icon:{w:23,h:25,l:23,t:21,x:9,lb:12},type:"park"}
// 	 ,{title:"天坛公园",content:"我的备注",point:"116.418067|39.885709",isOpen:1,icon:{w:23,h:25,l:23,t:21,x:9,lb:12},type:"park"}
// 	 ,{title:"世界花卉大观园",content:"我的备注",point:"116.36|39.8383",isOpen:1,icon:{w:23,h:25,l:23,t:21,x:9,lb:12},type:"park"}
// 	 ,{title:"朝阳公园",content:"我的备注",point:"116.487632|39.945919",isOpen:1,icon:{w:23,h:25,l:23,t:21,x:9,lb:12},type:"park"}
// 	 ,{title:"颐和园",content:"我的备注",point:"116.2775|39.999001",isOpen:1,icon:{w:23,h:25,l:23,t:21,x:9,lb:12},type:"park"}
// 	 ,{title:"圆明园",content:"我的备注",point:"116.316235|40.013757",isOpen:1,icon:{w:23,h:25,l:23,t:21,x:9,lb:12},type:"park"}
// 	 ,{title:"北京南站",content:"我的备注",point:"116.385656|39.869706",isOpen:1,icon:{w:21,h:21,l:0,t:0,x:6,lb:5},type:"station"}
// ];
//创建marker
function addMarker(points) {
    for (var i = 0; i < points.length; i++) {
        var json = points[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0, p1);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        createTag(marker, points[i]);
    }
}
function clear_marker(){
	map.clearOverlays();
	$("#s1 option:first").prop("selected", 'selected');
}
function createTag(marker,m){
    var text = "<p>"+m.title+"<"+m.point+">"+"</p>";
    var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + text + "</p>");
    marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
}
function moveTo(longitude,latitude){
    map.panTo(new BMap.Point(longitude,latitude));
}
//工具条点击效果
function mapActive(){
    $(".map_top>ul>li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(this).find("a").addClass("active");
        $(this).find("a").parents("li").siblings().find("a").removeClass("active");
    })
}

//右侧功能界面切换
function rightChange(){
    $(".map_right_top>ul>li").click(function(){
        var ins=$(this).index();
        $(this).addClass("li_active").siblings().removeClass("li_active");
        $(".map_con .map_con_div").eq(ins).show().siblings().hide();
    })
}
function callback(ele, data){
    alert("1");
}
function getPoint(){
	var city = document.getElementById("btn").value;
	var local = new BMap.LocalSearch("全国", {
        renderOptions: {
            map: map
        }
    });
	local.search(city);
}