
$('.close-pop').on('click', function () {
    $(this).parent().parent().hide().find('.cont-div').attr('style', 'visibility: hidden');
});

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
            $(".dl").load(location.href+" .dl");
        },
        error: function (msg) {
            alert("error" + msg);
        }
    })
}

function start(t,id){
    // console.log(t);
    var input_list = ['SNP','ENP','SNC','ENC','R','W','CONF'];
    var select_list = ['SL','EL'];
    var mix_list = ['SN','EN'];
    post_data = {};
    post_data['id'] = id;
    $.each(t,function (key,val){
        if(input_list.indexOf(key)>-1){
            for(let i in val){
                post_data[val[i]['init']]=$("#"+val[i]['value']).val();
            }
        }
        else if(select_list.indexOf(key)>-1){
            for(let i in val){
                post_data[val[i]['init']]=$("#"+val[i]['value']+" option:selected").val();
            }
        }
        else if(mix_list.indexOf(key)>-1){
            for(let i in val){
                if(val[i]['value']=='' || $("#"+key+"_label option:selected").val()=='' || $("#"+key+"_pro").val()==''){
                    alert('表单不允许为空！');
                    post_data = {};
                    return false;
                }else{
                    post_data[val[i]['init']]=val[i]['value']+":"+$("#"+key+"_label option:selected").val()+"{"+$("#"+key+"_pro").val()+":\""+$("#"+key+"_content").val()+"\"}";
                }
            }
        }
    });
    if(JSON.stringify(post_data) != '{}'){
        ajax_start(post_data);
    }
}

function ajax_start(post_data){
    $.ajax({
        url : "project_start",
        data: post_data,
        type: "POST",
        dataType: "json",
        success: function(data){
            console.log(data);
        },
        error: function (msg) {
            console.log("error" + msg);
        }
    });
}