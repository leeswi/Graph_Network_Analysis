
$('.close-pop').on('click', function () {
    $(this).parent().parent().hide().find('.cont-div').attr('style', 'visibility: hidden');
});

//选项卡间距
var screen_width = $(window).width()-40;
var margin_num = Math.floor(screen_width/300);
var all_margin = screen_width-300*(margin_num);
var margin_right = all_margin/margin_num;
while(margin_right<20){
    margin_num = margin_num-1;
    all_margin = screen_width-300*(margin_num);
    margin_right = all_margin/margin_num;
}
margin_top = 0.8*margin_right;
$('.c-col6').css('margin-right',margin_right);

function project_add(){
    $('.cont').attr('style', 'visibility: visible').find('.pop-up')
        .attr('style', 'visibility: visible').siblings()
        .attr('style', 'visibility: hidden');
    console.log('add');
}

function project_del(id){
    $.ajax({
        url: "project_del",
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: {
            'id': id,
        },
        async: false,
        success: function (result) {
            alert(result);
            $(".dashboard").load(location.href+" .dashboard");
        },
        error: function (msg) {
            alert("error" + msg);
        }
    })
}

function start(t,id,keylist){
    // console.log(t);
    var input_list = ['SNP','ENP','SNC','ENC','R','W','CONF'];
    var select_list = ['SL','EL','L'];
    var mix_list = ['SN','EN'];
    post_data = {};
    post_data['id'] = id;
    $.each(t,function (key,val){
        console.log(t);
        if(input_list.indexOf(key)>-1){
            for(let i in val){
                if(key=='CONF'){
                    post_data[val[i]['init']]=val[i]['value']+":"+$("#"+val[i]['value']).val();
                }else {
                    post_data[val[i]['init']] = $("#" + val[i]['value']).val();
                }
            }
        }
        else if(select_list.indexOf(key)>-1){
            for(let i in val){
                post_data[val[i]['init']]=$("#"+val[i]['value']+" option:selected").val();
            }
        }
        else if(mix_list.indexOf(key)>-1){
            for(let i in val){
                if(val[i]['value']=='' || $("#"+key+"_"+val[i]['value']+"_label option:selected").val()=='' || $("#"+key+"_"+val[i]['value']+"_pro").val()==''){
                    alert('表单不允许为空！');
                    post_data = {};
                    return false;
                }else{
                    post_data[val[i]['init']]=val[i]['value']+":"+$("#"+key+"_"+val[i]['value']+"_label option:selected").val()+"{"+$("#"+key+"_"+val[i]['value']+"_pro").val()+":\""+$("#"+key+"_"+val[i]['value']+"_content").val()+"\"}";
                }
            }
        }
    });
    if(JSON.stringify(post_data) != '{}'){
        ajax_start(post_data,keylist);
    }
}

function ajax_start(post_data,keylist){
    $.ajax({
        url : "project_start",
        data: post_data,
        type: "POST",
        dataType: "json",
        timeout: 3000,
        success: function(result){
            $("svg").empty();
            if (result[0] == '' && result[1] == '') {
                alert('没有查询结果');
            }
            ShowGraph(result[0], result[1], keylist);
        },
        error: function (msg) {
            console.log("error" + msg);
        }
    });
}
