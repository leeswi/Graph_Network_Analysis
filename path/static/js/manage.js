$(function() {
    $.contextMenu({
        selector: '#demo2',
        callback: function (key, options) {	//key为items的键，options为items的数据对象。
            if (key == 'add_l') {
                var text= getSelectText(document.getElementById("demo2"),'<L>','</L>');
                $("#demo2").val(text);
            }
            if (key == 'add_s_l') {
                var text= getSelectText(document.getElementById("demo2"),'<SL>','</SL>');
                $("#demo2").val(text);
            }
            if (key == 'add_e_l') {
                var text= getSelectText(document.getElementById("demo2"),'<EL>','</EL>');
                $("#demo2").val(text);
            }
            if (key == 'add_s_n') {
                var text= getSelectText(document.getElementById("demo2"),'<SN>','</SN>');
                $("#demo2").val(text);
            }
            if (key == 'add_e_n') {
                var text= getSelectText(document.getElementById("demo2"),'<EN>','</EN>');
                $("#demo2").val(text);
            }
            if (key == 'add_s_n_p') {
                var text= getSelectText(document.getElementById("demo2"),'<SNP>','</SNP>');
                $("#demo2").val(text);
            }
            if (key == 'add_e_n_p') {
                var text= getSelectText(document.getElementById("demo2"),'<ENP>','</ENP>');
                $("#demo2").val(text);
            }
            if (key == 'add_relationship') {
                var text= getSelectText(document.getElementById("demo2"),'<R>','</R>');
                $("#demo2").val(text);
            }
            if (key == 'add_s_n_c') {
                var text= getSelectText(document.getElementById("demo2"),'<SNC>','</SNC>');
                $("#demo2").val(text);
            }
            if (key == 'add_e_n_c') {
                var text= getSelectText(document.getElementById("demo2"),'<ENC>','</ENC>');
                $("#demo2").val(text);
            }
            if (key == 'add_config') {
                var text= getSelectText(document.getElementById("demo2"),'<CONF>','</CONF>');
                $("#demo2").val(text);
            }
            if (key == 'add_weight') {
                var text= getSelectText(document.getElementById("demo2"),'<W>','</W>');
                $("#demo2").val(text);
            }
            if (key == 'add_yield') {
                var text= getSelectText(document.getElementById("demo2"),'<YLD>','</YLD>');
                $("#demo2").val(text);
            }
            if (key == 'add_cypher') {
                var text= getSelectText(document.getElementById("demo2"),'<C>','</C>');
                $("#demo2").val(text);
            }
            if (key == 'add_r_n') {
                var text= getSelectText(document.getElementById("demo2"),'<RN>','</RN>');
                $("#demo2").val(text);
            }
            if (key == 'add_r_r') {
                var text= getSelectText(document.getElementById("demo2"),'<RR>','</RR>');
                $("#demo2").val(text);
            }
            if (key == 'add_r_c') {
                var text= getSelectText(document.getElementById("demo2"),'<RC>','</RC>');
                $("#demo2").val(text);
            }
        },
        items: {
            "add_label": {
                name: "标记标签",
                items: {
                    "add_l":{name: "标记标签"},
                    "add_s_l":{name: "起始节点标签"},
                    "add_e_l":{name: "结束节点标签"}
                }
            },	 //icon: 为图标。{}可以放数据id: $('').val()
            "add_node": {
                name: "标记节点",
                items: {
                    "add_s_n":{name: "起始节点"},
                    "add_e_n":{name: "结束节点"}
                }
            },
            "add_node_pro": {
                name: "标记节点属性",
                items: {
                    "add_s_n_p":{name: "起始节点属性"},
                    "add_e_n_p":{name: "结束节点属性"}
                }
            },
            "add_node_content": {
                name: "标记节点属性值",
                items: {
                    "add_s_n_c":{name: "起始节点属性值"},
                    "add_e_n_c":{name: "结束节点属性值"}
                }
            },
            "add_relationship": {name: "标记关系"},
            "add_config": {name: "标记参数"},
            "add_weight": {name: "标记权重"},
            "add_yield": {name: "标记中间值"},
            "add_return": {
                name: "标记返回值",
                items: {
                    "add_r_n":{name: "返回节点类型"},
                    "add_r_r":{name: "返回关系类型"},
                    "add_r_c":{name: "返回参数"},
                }
            },
            "add_cypher": {name: "标记cypher语句"}
        }
    });
});

function getSelectText(editor,s_label,e_label) {
    if (!editor) return; editor.focus();
    var val = editor.value.substring(editor.selectionStart, editor.selectionEnd);
    var con = document.getElementById('demo2').value;
    var rpl = replacepos(con,editor.selectionStart, editor.selectionEnd,s_label+val+e_label);
    return rpl;
}

function replacepos(str,start,end,replacetext){
    mystr = str.substring(0,start)+replacetext+str.substring(end);
    return mystr
}

function algo_del(id) {
    $.ajax({
        url: "algodel",
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: {
            'id': id,
        },
        async: false,
        success: function (result) {
            alert('删除成功');
            window.location.reload()
        },
        error: function (msg) {
            alert("error" + msg);
        }
    })
}