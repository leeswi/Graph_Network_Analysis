$(document).ready(function(){
	var whei=$(window).width();
	$("html").css({fontSize:whei/20});
	$(window).resize(function(){
		var whei=$(window).width();
		$("html").css({fontSize:whei/20});
    });
});

$('.close-pop').on('click', function () {
    $(this).parent().parent().hide().find('.cont-div').attr('style', 'visibility: hidden');
});
function choose_1(){
    $('#compare_1').attr('style', 'visibility: visible').find('.pop-up').attr('style', 'visibility: visible').siblings().attr('style', 'visibility: hidden');
}
function choose_2(){
    $('#compare_2').attr('style', 'visibility: visible').find('.pop-up').attr('style', 'visibility: visible').siblings().attr('style', 'visibility: hidden');
}

function compare_1(id) {
    var name = $("input[name='name_1']").val();
    var label = $("input[name='label_1']").val();
    var rela = $("input[name='rela_1']").val();
    var filter_key1 = $("input[name='key1_1']").val();
    var filter_if1 = $('#filter_if option:selected').text();
    var filter_content1 = $("input[name='property1_1']").val();
    $.ajax({ //节点重要性判定
        url: "compare/pagerank",
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: {
            'label': label,
            'rela': rela,
            'key1':filter_key1,
            'if1':filter_if1,
            'content1':filter_content1
        },
        dataType: "json",
        async: false,
        success: function (result) {
            $("#"+id).empty();
            for(let i in result){
                $("#"+id).append("<li class=\"clearfix\"> <span class=\"pulll_left\">"+result[i]['node']+"（"+result[i]['label']+"）"+"</span> <span class=\"pulll_right\">"+result[i]['score']+"</span> </li>")
            }
            var html2=$("#pr1 ul").html();
            $("#pr1 ul").append(html2);
            var ls2=$("#pr1 li").length/2+1;
            console.log(ls2);
            a=0;
            ref = setInterval(function(){
                a++;
                if(a==ls2){
                    a=1;
                    $("#pr1 ul").css({marginTop:0});
                    $("#pr1 ul").animate({marginTop:-'.5'*a+'rem'},800)
                }
                $("#pr1 ul").animate({marginTop:-'.5'*a+'rem'},800)
            },4300);
        },
        error: function (msg) {
            console.log("error" + msg);
        }
    });
    $.ajax({ //节点重要性判定
        url: "compare/count",
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: {
            'label': label,
            'rela': rela,
            'key1':filter_key1,
            'if1':filter_if1,
            'content1':filter_content1
        },
        dataType: "json",
        async: false,
        success: function (result) {
            console.log(result);
            setpie("echarts6",result['allnode'],result['nodenum'],'#6c7dfc','节点数量');
            setpie("echarts7",result['allrelas'],result['relanum'],'#fccb00','关系数量');
            setpie("echarts8",result['alllabel'],result['labelnum'],'#62b62f','标签数量');
            $("#avgdegree1").text(result['avgdegree']);
            $("#avgCC1").text(result['avgCC']);
        },
        error: function (msg) {
            console.log("error" + msg);
        }
    });
    $("#name_1").text(name);
    $("#compare_1").hide();
}
function compare_2(id) {
    var name = $("input[name='name_2']").val();
    var label = $("input[name='label_2']").val();
    var rela = $("input[name='rela_2']").val();
    var filter_key1 = $("input[name='key1_2']").val();
    var filter_if1 = $('#filter_if_2 option:selected').text();
    var filter_content1 = $("input[name='property1_2']").val();
    $.ajax({
        url: "compare/pagerank",
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: {
            'label': label,
            'rela': rela,
            'key1':filter_key1,
            'if1':filter_if1,
            'content1':filter_content1
        },
        dataType: "json",
        async: false,
        success: function (result) {
            $("#"+id).empty();
            for(let i in result){
                $("#"+id).append("<li class=\"clearfix\"> <span class=\"pulll_left\">"+result[i]['node']+"（"+result[i]['label']+"）"+"</span> <span class=\"pulll_right\">"+result[i]['score']+"</span> </li>")
            }
            var html2=$("#pr2 ul").html();
            $("#pr2 ul").append(html2);
            var ls2=$("#pr2 li").length/2+1;
            a=0;
            ref = setInterval(function(){
                a++;
                if(a==ls2){
                    a=1;
                    $("#pr2 ul").css({marginTop:0});
                    $("#pr2 ul").animate({marginTop:-'.5'*a+'rem'},800)
                }
                $("#pr2 ul").animate({marginTop:-'.5'*a+'rem'},800)
            },4300);
        },
        error: function (msg) {
            console.log("error" + msg);
        }
    });
    $.ajax({ //节点重要性判定
        url: "compare/count",
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: {
            'label': label,
            'rela': rela,
            'key1':filter_key1,
            'if1':filter_if1,
            'content1':filter_content1
        },
        dataType: "json",
        async: false,
        success: function (result) {
            console.log(result);
            setpie("echarts3",result['allnode'],result['nodenum'],'#6c7dfc','节点数量');
            setpie("echarts4",result['allrelas'],result['relanum'],'#fccb00','关系数量');
            setpie("echarts5",result['alllabel'],result['labelnum'],'#62b62f','标签数量');
            $("#avgdegree2").text(result['avgdegree']);
            $("#avgCC2").text(result['avgCC']);
        },
        error: function (msg) {
            console.log("error" + msg);
        }
    });
    $("#name_2").text(name);
    $("#compare_2").hide();
}